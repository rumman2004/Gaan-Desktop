; GAAN joins "Open with" for the audio files it plays. Offered only, never
; made the default: the extensions' own default stays the user's choice (the
; association electron-builder would write takes it over). The extension list
; matches electron/audio-types.ts (PLAYABLE_AUDIO); a test keeps them in step.

!macro GAANOfferFor EXT
  WriteRegStr SHELL_CONTEXT "Software\Classes\.${EXT}\OpenWithProgids" "GAAN.Audio" ""
  WriteRegStr SHELL_CONTEXT "Software\Classes\Applications\${APP_EXECUTABLE_FILENAME}\SupportedTypes" ".${EXT}" ""
!macroend

!macro GAANWithdrawFrom EXT
  DeleteRegValue SHELL_CONTEXT "Software\Classes\.${EXT}\OpenWithProgids" "GAAN.Audio"
!macroend

!macro GAANEachAudioExtension MACRO
  !insertmacro ${MACRO} "mp3"
  !insertmacro ${MACRO} "m4a"
  !insertmacro ${MACRO} "aac"
  !insertmacro ${MACRO} "flac"
  !insertmacro ${MACRO} "ogg"
  !insertmacro ${MACRO} "oga"
  !insertmacro ${MACRO} "opus"
  !insertmacro ${MACRO} "wav"
  !insertmacro ${MACRO} "webm"
!macroend

!macro customInstall
  WriteRegStr SHELL_CONTEXT "Software\Classes\GAAN.Audio" "" "Audio file"
  WriteRegStr SHELL_CONTEXT "Software\Classes\GAAN.Audio\DefaultIcon" "" "$appExe,0"
  WriteRegStr SHELL_CONTEXT "Software\Classes\GAAN.Audio\shell\open" "" "Play with GAAN"
  WriteRegStr SHELL_CONTEXT "Software\Classes\GAAN.Audio\shell\open\command" "" '"$appExe" "%1"'
  WriteRegStr SHELL_CONTEXT "Software\Classes\Applications\${APP_EXECUTABLE_FILENAME}\shell\open\command" "" '"$appExe" "%1"'
  !insertmacro GAANEachAudioExtension GAANOfferFor
  ; Let Explorer pick the new "Open with" entries up now.
  System::Call "shell32::SHChangeNotify(i 0x08000000, i 0x1000, p 0, p 0)"
!macroend

!macro customUnInstall
  !insertmacro GAANEachAudioExtension GAANWithdrawFrom
  DeleteRegKey SHELL_CONTEXT "Software\Classes\GAAN.Audio"
  DeleteRegKey SHELL_CONTEXT "Software\Classes\Applications\${APP_EXECUTABLE_FILENAME}"
  System::Call "shell32::SHChangeNotify(i 0x08000000, i 0x1000, p 0, p 0)"
!macroend
