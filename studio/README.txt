GVT STUDIO r36 — the battle-scene recorder (Green vs. Tan)
For the team: Wyatt, Isaac, Dylan, Al, Laura, Skylar. Mac only. Needs Google Chrome installed.

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
- Planes: the AIR row on the palette. Drop the V2 BOMBER where its bombs should fall: when you PLAY it flies in from its side's edge, drops its stick across that spot, turns at the far edge and comes back for a second stick (while paused a dashed line marks its run). Drop a DOGFIGHTER or the V2 DOGFIGHTER where it should take off: it climbs, patrols over the other side's half, strafes their men and fights their planes. On a battleground both sides fly them; in a campaign level, a boss or a park only yours. They fly at the palette's UNIT LEVEL; UNDO and CLEAR THE FIELD take them off like everything else.
- Drag empty ground to move your view; VIEW + / − zooms it; WHOLE shows the whole world. Drag inside the white finder to move the film camera.
- PLAY (Space) runs the fight; pause again any time. UNDO (Backspace) puts the whole field back exactly as it stood at the first PLAY: the men, every explosion and scorch mark, every wreck and shot, the purse and the clock.
- R records the finder's 9:16 take through Chrome's hardware H.264 encoder (24 Mbps, the same picture as before): up to 60 frames a second on an Apple-chip Mac, 30 on an older Intel Mac. The files land in studio/takes/. TWO FILES on the controls also records the other frame (16:9 beside a 9:16 take) as a second file: it starts on for an Apple-chip Mac and off for an Intel one, where two files cost about half the frames; your own choice is kept. REVEAL LAST TAKE opens the folder.
- ▼ HIDE CONTROLS folds the tools; the palette stays; ▲ SHOW CONTROLS brings them back.
- Another level: BATTLEGROUND / CAMPAIGN LEVEL / a boss / a park in the door row, then GO. CLEAR THE FIELD empties both sides.
- The YOU and CPU colour menus on the palette set each army's colour.

NOTES
- This is GVT Studio r36 (11/5/2026): the V2 Bomber and the Dogfighters on the palette (Skylar's ask), on top of r35 and the smooth-on-older-Macs changes.
- The game inside is a frozen copy (the version is in the window title's staged line). Nothing you do here touches the live game or any account.
- No ffmpeg on your Mac? Takes are still saved (Chrome's own mp4).
- Smooth on older Macs (Skylar's changes, tested on his 2015 MacBook Pro: takes went from 7-11 to 28 frames a second). On an Intel Mac your screen shows the field a little lighter while nothing records, at most 30 times a second, and while a take rolls the field outside the white finder refreshes a strip at a time (Q switches that on or off on any Mac). Only your screen changes: the take is drawn in full. Paused with your hands off, the studio redraws 12 times a second on every Mac. On an older Mac keep UI ON SCREEN (G) off while recording: the game's top bar and tray cost about two thirds of the frames there.
- If Chrome quits in the middle of a take, that take is lost (the file is finished when you stop).
- Trouble: quit Chrome windows named GVT STUDIO and click the app again. The app's log is /tmp/gvt-studio-app.log.
