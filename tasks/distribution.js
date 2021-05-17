const electronBuilder = require('electron-builder');

function packForWin() {
  return builder.build({
    targets: builder.Platform.WINDOWS.createTarget();
  });
}

packForWin.displayName = 'builder-for-win';

exports.packWin = packForWin;
