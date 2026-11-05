GVT STUDIO — the battle-scene recorder (Green vs. Tan)
For the team: Wyatt, Isaac, Dylan, Al, Laura. Mac only. Needs Google Chrome installed.

GET GOING
1. Unzip "GVT Studio". Keep the folder together (the app, studio/, autoplay/).
2. First time: macOS asks once because the app is unsigned. Double-click "GVT Studio.app"; when macOS says it could not
   verify it, click Done, then System Settings → Privacy & Security → scroll to Security → Open Anyway → Open.
   (macOS 14 or older: right-click the app → Open → Open.) In a hurry, one Terminal line, then double-click:
   xattr -dr com.apple.quarantine ~/Downloads/"GVT Studio"
   macOS may also ask once to let GVT Studio control System Events: allow it (that is how it brings its window forward).
3. The studio opens on the battleground at THE CROSSING, paused, with the units board (the palette) open.

THE LOOP
- Drag men from the palette onto the field: yours on the left, the computer's on the right. Press on a man on the field and drag him anywhere. Double-press a man to pin the film camera to him (a red dot while paused; double-press again to let go). PIN X on the controls sets where the pinned camera aims: 0 = right on him, 50 (the start) = a quarter-frame ahead to his right, 100 = he stands on the frame's left edge; negatives lead to the left. Type a number, hold − / +, or press , and . to nudge by 5.
- Drag empty ground to move your view; VIEW + / − zooms it; WHOLE shows the whole world. Drag inside the white finder to move the film camera.
- PLAY (Space) runs the fight; pause again any time. UNDO (Backspace) puts the whole field back exactly as it stood at the first PLAY: the men, every explosion and scorch mark, every wreck and shot, the purse and the clock.
- R records the finder's 9:16 take; the files land in studio/takes/. REVEAL LAST TAKE opens the folder.
- ▼ HIDE CONTROLS folds the tools; the palette stays; ▲ SHOW CONTROLS brings them back.
- Another level: BATTLEGROUND / CAMPAIGN LEVEL / a boss / a park in the door row, then GO. CLEAR THE FIELD empties both sides.
- The YOU and CPU colour menus on the palette set each army's colour.

NOTES
- The game inside is a frozen copy (the version is in the window title's staged line). Nothing you do here touches the live game or any account.
- No ffmpeg on your Mac? Takes are still saved (Chrome's own mp4).
- Trouble: quit Chrome windows named GVT STUDIO and click the app again. The app's log is /tmp/gvt-studio-app.log.
