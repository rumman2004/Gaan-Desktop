/**
 * AI Music Recommendations & Smart Queue Shuffle
 *
 * Multi-tier recommendation architecture:
 *  - Tier 1 (AI): Groq, Google Gemini, Cohere, or Custom OpenAI (xingchiapi)
 *  - Tier 2 (Free API Fallback): iTunes free music recommendation endpoints
 *  - Tier 3 (Engine Fallback): Native YouTube Music Radio (getRadio)
 *
 * All suggestions resolve to playable Track objects via the native bridge.
 * If any tier fails or times out, the engine falls back gracefully without
 * crashing or interrupting playback.
 */

import {
  useSettings,
  ENV_GEMINI_KEY,
  ENV_GROQ_KEY,
  ENV_COHERE_KEY,
  ENV_OPENAI_KEY,
  ENV_OPENAI_BASE,
  ENV_OPENAI_MODEL,
} from "../stores/settings";
import { usePlayer } from "../stores/player";
import { useUI } from "../stores/ui";
import { requireBridge } from "./bridge";
import type { Track } from "../types";

export interface AISongSuggestion {
  title: string;
  artist: string;
  reason?: string;
}

export type SupportedAiProvider = "gemini" | "groq" | "cohere" | "openai";

/** Test an AI key to give instant feedback in Settings */
export async function testAiKey(
  provider: SupportedAiProvider,
  overrideKey?: string,
  extraOptions?: { baseUrl?: string; model?: string }
): Promise<{ ok: boolean; message: string }> {
  const settings = useSettings.getState();
  const rawKey =
    overrideKey !== undefined
      ? overrideKey
      : provider === "gemini"
        ? settings.geminiApiKey || ENV_GEMINI_KEY
        : provider === "groq"
          ? settings.groqApiKey || ENV_GROQ_KEY
          : provider === "cohere"
            ? settings.cohereApiKey || ENV_COHERE_KEY
            : settings.openaiApiKey || ENV_OPENAI_KEY;
  const key = rawKey.trim();

  if (!key) return { ok: false, message: "Please enter an API key." };

  try {
    if (provider === "gemini") {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Say 'OK' if you can read this." }] }],
        }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const msg = errorData?.error?.message || `HTTP ${res.status}`;
        return { ok: false, message: `Gemini API error: ${msg}` };
      }
      return { ok: true, message: "Google Gemini 2.5 Flash verified successfully." };
    }

    if (provider === "groq") {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [{ role: "user", content: "Say OK" }],
          max_tokens: 10,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const msg = errorData?.error?.message || `HTTP ${res.status}`;
        return { ok: false, message: `Groq error: ${msg}` };
      }
      return { ok: true, message: "Groq (Ultra-Fast LPU) verified successfully." };
    }

    if (provider === "cohere") {
      const res = await fetch("https://api.cohere.com/v2/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command-r7b-12-2024",
          messages: [{ role: "user", content: "Say OK" }],
          max_tokens: 10,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const msg = errorData?.message || `HTTP ${res.status}`;
        return { ok: false, message: `Cohere error: ${msg}` };
      }
      return { ok: true, message: "Cohere Command-R verified successfully." };
    }

    // OpenAI / Custom Endpoint (xingchiapi)
    const baseUrl = (extraOptions?.baseUrl || settings.openaiBaseUrl || ENV_OPENAI_BASE).replace(/\/+$/, "");
    const isXingchi = baseUrl.includes("xingchiapi.com");
    const headers: Record<string, string> = {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    };
    if (isXingchi) {
      headers["x-openai-actor-authorization"] = "local-image-extension";
      headers["User-Agent"] = "Codex CLI";
    }

    const testUrl = `${baseUrl}/models`;
    const res = await fetch(testUrl, { headers });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const msg = errData?.error?.message || `HTTP ${res.status}`;
      return { ok: false, message: `OpenAI / Custom API error: ${msg}` };
    }
    return { ok: true, message: "OpenAI / Custom provider connected successfully!" };
  } catch (err) {
    return {
      ok: false,
      message: `Connection error: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

/** Ask Gemini API with a structured prompt */
async function queryGeminiPrompt(prompt: string, apiKey: string): Promise<AISongSuggestion[]> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    }),
    signal: AbortSignal.timeout(7000),
  });

  if (!res.ok) throw new Error(`Gemini status ${res.status}`);
  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return [];

  const parsed = JSON.parse(text);
  const arr = Array.isArray(parsed) ? parsed : parsed.songs || parsed.recommendations || [];
  return arr
    .map((item: any) => ({
      title: String(item.title || item.song || "").trim(),
      artist: String(item.artist || "").trim(),
    }))
    .filter((s: any) => s.title && s.artist);
}

/** Ask Groq for lightning-fast music recommendations */
async function queryGroqPrompt(prompt: string, apiKey: string): Promise<AISongSuggestion[]> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: 'You are an expert music curator. Respond with JSON: {"songs": [{"title": "Song Title", "artist": "Artist Name"}]}',
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(6000),
  });

  if (!res.ok) throw new Error(`Groq status ${res.status}`);
  const json = await res.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) return [];

  const parsed = JSON.parse(content);
  const arr = Array.isArray(parsed) ? parsed : parsed.songs || parsed.recommendations || [];
  return arr
    .map((item: any) => ({
      title: String(item.title || item.song || "").trim(),
      artist: String(item.artist || "").trim(),
    }))
    .filter((s: any) => s.title && s.artist);
}

/** Ask Cohere for intelligent music suggestions */
async function queryCoherePrompt(prompt: string, apiKey: string): Promise<AISongSuggestion[]> {
  const res = await fetch("https://api.cohere.com/v2/chat", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "command-r7b-12-2024",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: 'You are an expert music curator. Respond with JSON: {"songs": [{"title": "Song Title", "artist": "Artist Name"}]}',
        },
        { role: "user", content: prompt },
      ],
    }),
    signal: AbortSignal.timeout(7000),
  });

  if (!res.ok) throw new Error(`Cohere status ${res.status}`);
  const json = await res.json();
  const text = json.message?.content?.[0]?.text;
  if (!text) return [];

  const parsed = JSON.parse(text);
  const arr = Array.isArray(parsed) ? parsed : parsed.songs || parsed.recommendations || [];
  return arr
    .map((item: any) => ({
      title: String(item.title || item.song || "").trim(),
      artist: String(item.artist || "").trim(),
    }))
    .filter((s: any) => s.title && s.artist);
}

/** Ask OpenAI / Custom endpoint for complementary songs */
async function queryOpenAIPrompt(
  prompt: string,
  apiKey: string,
  baseUrl: string,
  model: string
): Promise<AISongSuggestion[]> {
  const cleanBase = baseUrl.replace(/\/+$/, "");
  const isXingchi = cleanBase.includes("xingchiapi.com");
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey.trim()}`,
    "Content-Type": "application/json",
  };
  if (isXingchi) {
    headers["x-openai-actor-authorization"] = "local-image-extension";
    headers["User-Agent"] = "Codex CLI";
  }

  // xingchiapi has disabled /v1/chat/completions in favor of /v1/responses (Responses API)
  if (isXingchi) {
    const res = await fetch(`${cleanBase}/responses`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: model || "gpt-6.1-sol",
        input: `You are an expert music curator. Recommend complementary tracks. Format response ONLY as valid JSON: {"songs":[{"title":"Song Title","artist":"Artist Name"}]}.\n\nRequest: ${prompt}`,
      }),
      signal: AbortSignal.timeout(14000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`xingchiapi status ${res.status}: ${errText}`);
    }

    const json = await res.json();
    let content = "";
    if (Array.isArray(json.output)) {
      const msgItem = json.output.find(
        (o: any) => o.type === "message" || o.role === "assistant"
      );
      content = msgItem?.content?.[0]?.text || "";
    } else if (typeof json.output === "string") {
      content = json.output;
    } else if (json.text) {
      content = json.text;
    }

    if (!content) return [];

    const jsonMatch = content.match(/\{[\s\S]*\}/) || content.match(/\[[\s\S]*\]/);
    const rawToParse = jsonMatch ? jsonMatch[0] : content;
    const parsed = JSON.parse(rawToParse);
    const arr = Array.isArray(parsed) ? parsed : parsed.songs || parsed.recommendations || [];
    return arr
      .map((item: any) => ({
        title: String(item.title || item.song || "").trim(),
        artist: String(item.artist || "").trim(),
      }))
      .filter((s: any) => s.title && s.artist);
  }

  // Standard OpenAI chat completions endpoint
  const res = await fetch(`${cleanBase}/chat/completions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: model || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: 'You are an expert music curator. Respond with JSON: {"songs": [{"title": "Song Title", "artist": "Artist Name"}]}',
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error(`OpenAI status ${res.status}`);
  const json = await res.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) return [];

  const parsed = JSON.parse(content);
  const arr = Array.isArray(parsed) ? parsed : parsed.songs || parsed.recommendations || [];
  return arr
    .map((item: any) => ({
      title: String(item.title || item.song || "").trim(),
      artist: String(item.artist || "").trim(),
    }))
    .filter((s: any) => s.title && s.artist);
}

/**
 * Run the prompt through the configured AI cascade (Groq -> Gemini -> Cohere -> OpenAI)
 */
async function queryAiCascade(prompt: string): Promise<AISongSuggestion[]> {
  const settings = useSettings.getState();
  if (!settings.aiSmartShuffle) return [];

  const groqKey = (settings.groqApiKey || ENV_GROQ_KEY).trim();
  const geminiKey = (settings.geminiApiKey || ENV_GEMINI_KEY).trim();
  const cohereKey = (settings.cohereApiKey || ENV_COHERE_KEY).trim();
  const openaiKey = (settings.openaiApiKey || ENV_OPENAI_KEY).trim();
  const openaiBase = (settings.openaiBaseUrl || ENV_OPENAI_BASE).trim();
  const openaiModel = (settings.openaiModel || ENV_OPENAI_MODEL).trim();

  const providersToTry: SupportedAiProvider[] = [];
  if (settings.aiProvider !== "auto") {
    providersToTry.push(settings.aiProvider);
  }
  const priorityList: SupportedAiProvider[] = ["groq", "gemini", "cohere", "openai"];
  for (const p of priorityList) {
    if (!providersToTry.includes(p)) providersToTry.push(p);
  }

  for (const provider of providersToTry) {
    try {
      let suggestions: AISongSuggestion[] = [];
      if (provider === "groq" && groqKey) {
        suggestions = await queryGroqPrompt(prompt, groqKey);
      } else if (provider === "gemini" && geminiKey) {
        suggestions = await queryGeminiPrompt(prompt, geminiKey);
      } else if (provider === "cohere" && cohereKey) {
        suggestions = await queryCoherePrompt(prompt, cohereKey);
      } else if (provider === "openai" && openaiKey) {
        suggestions = await queryOpenAIPrompt(prompt, openaiKey, openaiBase, openaiModel);
      }
      if (suggestions.length > 0) return suggestions;
    } catch (err) {
      console.warn(`[GAAN][AI] Provider ${provider} failed, cascading:`, err);
    }
  }

  return [];
}

/** Free fallback: iTunes API for similar tracks by artist/genre */
async function queryFreeFallback(track: Track, count: number): Promise<AISongSuggestion[]> {
  try {
    const term = encodeURIComponent(track.artist || track.title);
    const url = `https://itunes.apple.com/search?term=${term}&entity=song&limit=${count * 2}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return [];
    const json = await res.json();
    const results = json.results ?? [];
    const suggestions: AISongSuggestion[] = [];
    const seen = new Set<string>();

    for (const r of results) {
      const title = r.trackName?.trim();
      const artist = r.artistName?.trim();
      if (!title || !artist) continue;
      if (title.toLowerCase() === track.title.toLowerCase()) continue;
      const key = `${title.toLowerCase()}::${artist.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      suggestions.push({ title, artist });
      if (suggestions.length >= count) break;
    }
    return suggestions;
  } catch {
    return [];
  }
}

/** Resolves an array of { title, artist } to playable Track objects via bridge */
async function resolveSuggestionsToTracks(
  suggestions: AISongSuggestion[],
  excludeIds: Set<string>
): Promise<Track[]> {
  const bridge = requireBridge();
  const resolved: Track[] = [];

  const searches = suggestions.map(async (s) => {
    try {
      const query = `${s.title} ${s.artist}`;
      const searchRes = await bridge.search(query, true);
      const song = searchRes?.songs?.[0];
      if (song && !excludeIds.has(song.id)) {
        return song;
      }
    } catch {
      /* ignore individual search failures */
    }
    return null;
  });

  const results = await Promise.all(searches);
  for (const song of results) {
    if (song && !resolved.some((t) => t.id === song.id)) {
      resolved.push(song);
    }
  }

  return resolved;
}

/**
 * Get intelligent recommendations for a single track:
 * Multi-tier: Groq / Gemini / Cohere / OpenAI → Free iTunes API → Native YouTube Music Radio
 */
export async function getSmartRecommendations(track: Track, count = 5): Promise<Track[]> {
  const prompt = `Recommend ${count + 2} songs that match the style, genre, vibe, and energy of "${track.title}" by "${track.artist}".
Respond with JSON: {"songs": [{"title": "Song Title", "artist": "Artist Name"}]}`;

  const excludeIds = new Set<string>([track.id]);
  let suggestions = await queryAiCascade(prompt);

  // Tier 2: Free API Fallback
  if (!suggestions.length) {
    suggestions = await queryFreeFallback(track, count);
  }

  // Resolve suggestions to real tracks
  if (suggestions.length) {
    const tracks = await resolveSuggestionsToTracks(suggestions, excludeIds);
    if (tracks.length >= 2) return tracks.slice(0, count);
  }

  // Tier 3: Native YouTube Music Radio fallback
  try {
    const radio = await requireBridge().getRadio(track.id);
    if (radio?.tracks?.length) {
      return radio.tracks.filter((t) => t.id !== track.id).slice(0, count);
    }
  } catch (err) {
    console.warn("[GAAN][AI] Radio fallback failed:", err);
  }

  return [];
}

/**
 * Get intelligent AI recommendations for a playlist:
 * Uses the playlist's tracks and name to suggest songs matching the vibe.
 */
export async function getPlaylistRecommendations(
  playlist: { id: string; name: string; tracks: Track[] },
  count = 5,
  excludeIds?: Set<string>
): Promise<Track[]> {
  const excluded = new Set<string>([
    ...playlist.tracks.map((t) => t.id),
    ...(excludeIds ? Array.from(excludeIds) : []),
  ]);

  const sample =
    playlist.tracks.length > 0
      ? [...playlist.tracks].sort(() => Math.random() - 0.5).slice(0, 5)
      : [];

  const sampleStr = sample.map((t) => `"${t.title}" by ${t.artist}`).join(", ");
  const prompt =
    sample.length > 0
      ? `The user has a music playlist titled "${playlist.name}" containing tracks like: ${sampleStr}.
Recommend ${count + 3} fresh complementary songs that match this vibe, style, and genre.
Do not recommend any of the sample songs.
Respond strictly with JSON: {"songs": [{"title": "Song Title", "artist": "Artist Name"}]}`
      : `Recommend ${count + 3} popular great songs for a playlist titled "${playlist.name}".
Respond strictly with JSON: {"songs": [{"title": "Song Title", "artist": "Artist Name"}]}`;

  let suggestions = await queryAiCascade(prompt);

  // Tier 2: Free Fallback
  if (!suggestions.length && sample.length > 0) {
    const pick = sample[Math.floor(Math.random() * sample.length)];
    suggestions = await queryFreeFallback(pick, count + 2);
  }

  // Resolve to tracks
  if (suggestions.length) {
    const tracks = await resolveSuggestionsToTracks(suggestions, excluded);
    if (tracks.length >= count) return tracks.slice(0, count);
    if (tracks.length > 0) return tracks;
  }

  // Tier 3: Radio or search fallback
  try {
    const bridge = requireBridge();
    if (sample.length > 0) {
      const radio = await bridge.getRadio(sample[0].id);
      if (radio?.tracks?.length) {
        return radio.tracks.filter((t) => !excluded.has(t.id)).slice(0, count);
      }
    } else {
      const searchRes = await bridge.search(playlist.name, true);
      if (searchRes?.songs?.length) {
        return (searchRes.songs as Track[]).filter((t: Track) => !excluded.has(t.id)).slice(0, count);
      }
    }
  } catch (err) {
    console.warn("[GAAN][AI] Playlist fallback failed:", err);
  }

  return [];
}

/**
 * Variety Shuffle: distributes tracks so the same artist is rarely consecutive,
 * creating an organic, dynamic vibe transition.
 */
function artistVarietyShuffle(tracks: Track[]): Track[] {
  if (tracks.length <= 2) return [...tracks].reverse();

  const groups: Record<string, Track[]> = {};
  for (const t of tracks) {
    const artist = (t.artist || "unknown").toLowerCase();
    if (!groups[artist]) groups[artist] = [];
    groups[artist].push(t);
  }

  for (const key of Object.keys(groups)) {
    groups[key].sort(() => Math.random() - 0.5);
  }

  const sortedKeys = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);
  const result: Track[] = [];
  let remaining = true;

  while (remaining) {
    remaining = false;
    for (const key of sortedKeys) {
      if (groups[key].length > 0) {
        result.push(groups[key].shift()!);
        remaining = true;
      }
    }
  }

  return result;
}

/**
 * Smart Queue Shuffle:
 * Reorders upcoming songs intelligently using AI harmonic flow or artist variety.
 */
export async function applySmartShuffle(): Promise<{ success: boolean; count: number; mode: string }> {
  const player = usePlayer.getState();
  const current = player.queue[player.index];
  const upcoming = player.queue.slice(player.index + 1);

  if (upcoming.length <= 1) {
    useUI.getState().toast("Queue has fewer than 2 upcoming songs to shuffle", "info");
    return { success: false, count: 0, mode: "none" };
  }

  const settings = useSettings.getState();
  let reordered: Track[] | null = null;
  let mode = "variety";

  if (settings.aiSmartShuffle && current && upcoming.length <= 25) {
    try {
      const titles = upcoming.map((t, idx) => `${idx + 1}. "${t.title}" by ${t.artist}`).join("\n");
      const prompt = `Current track playing: "${current.title}" by ${current.artist}.
Below are ${upcoming.length} upcoming songs in the queue:
${titles}

Order these songs for a smooth listening flow (tempo, mood, and vibe transitions, with varied artists).
Respond with a JSON array of the indices (1-based) in your recommended order.
Example: [3, 1, 4, 2]`;

      const groqKey = (settings.groqApiKey || ENV_GROQ_KEY).trim();
      const geminiKey = (settings.geminiApiKey || ENV_GEMINI_KEY).trim();

      if (groqKey) {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${groqKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            messages: [
              { role: "system", content: "You order songs for listening flow. Return JSON array of numbers." },
              { role: "user", content: prompt },
            ],
            response_format: { type: "json_object" },
          }),
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          const json = await res.json();
          const text = json.choices?.[0]?.message?.content;
          if (text) {
            const parsed = JSON.parse(text);
            const indices = Array.isArray(parsed) ? parsed : parsed.order || parsed.indices || [];
            if (Array.isArray(indices) && indices.length === upcoming.length) {
              reordered = indices.map((i: number) => upcoming[i - 1]).filter(Boolean);
              if (reordered.length === upcoming.length) mode = "ai";
            }
          }
        }
      } else if (geminiKey) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" },
          }),
          signal: AbortSignal.timeout(6000),
        });
        if (res.ok) {
          const json = await res.json();
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const indices: number[] = JSON.parse(text);
            if (Array.isArray(indices) && indices.length === upcoming.length) {
              reordered = indices.map((i) => upcoming[i - 1]).filter(Boolean);
              if (reordered.length === upcoming.length) mode = "ai";
            }
          }
        }
      }
    } catch (err) {
      console.warn("[GAAN][AI] AI Smart Shuffle order failed, falling back to Variety Shuffle:", err);
    }
  }

  // Fallback to organic Artist Variety Shuffle
  if (!reordered || reordered.length !== upcoming.length) {
    reordered = artistVarietyShuffle(upcoming);
  }

  // Apply to queue
  const newQueue = [...player.queue.slice(0, player.index + 1), ...reordered];
  usePlayer.setState({ queue: newQueue, shuffle: true });

  const msg = mode === "ai" ? "Queue Smart-Shuffled with AI flow" : "Queue shuffled with artist variety";
  useUI.getState().toast(msg, "success");

  return { success: true, count: reordered.length, mode };
}

/**
 * Add AI Recommendations to upcoming queue
 */
export async function addAISuggestionsToQueue(count = 5): Promise<void> {
  const current = usePlayer.getState().queue[usePlayer.getState().index];
  if (!current) {
    useUI.getState().toast("Play a song first to get AI recommendations", "info");
    return;
  }

  useUI.getState().toast("Generating smart recommendations…", "info", 2000);

  try {
    const recs = await getSmartRecommendations(current, count);
    if (!recs.length) {
      useUI.getState().toast("Could not find matching recommendations right now", "warning");
      return;
    }

    usePlayer.getState().addToQueue(recs);
    useUI.getState().toast(`Added ${recs.length} smart recommendations to queue`, "success");
  } catch (err) {
    console.error("[GAAN][AI] addAISuggestionsToQueue error:", err);
    useUI.getState().toast("Failed to generate recommendations", "error");
  }
}
