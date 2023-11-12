export const mimeTypeToExtension = (mimeType: string): string => {
  const extension: { [key: string]: string } = {
    'video/3gpp2': '3g2',
    'video/3gpp': '3gp',
    'application/x-7z-compressed': '7z',
    'audio/aac': 'aac',
    'application/x-abiword': 'abw',
    'application/x-freearc': 'arc',
    'video/x-msvideo': 'avi',
    'image/avif': 'avif',
    'application/vnd.amazon.ebook': 'azw',
    'application/octet-stream': 'bin',
    'image/bmp': 'bmp',
    'application/x-bzip': 'bz',
    'application/x-bzip2': 'bz2',
    'application/x-cdf': 'cda',
    'image/x-cmx': 'cmx',
    'image/cis-cod': 'cod',
    'application/x-csh': 'csh',
    'text/css': 'css',
    'text/csv': 'csv',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-fontobject': 'eot',
    'application/epub+zip': 'epub',
    'image/gif': 'gif',
    'application/gzip': 'gz',
    'text/html': 'html',
    'image/x-icon': 'ico',
    'text/calendar': 'ics',
    'image/ief': 'ief',
    'application/java-archive': 'jar',
    'image/pipeg': 'jfi',
    'image/jpeg': 'jpg',
    'text/javascript': 'js',
    'application/json': 'json',
    'application/ld+json': 'jsonld',
    'audio/midi': 'mid',
    'audio/mpeg': 'mp3',
    'video/mp4': 'mp4',
    'video/mpeg': 'mpeg',
    'application/vnd.apple.installer+xml': 'mpkg',
    'application/vnd.oasis.opendocument.presentation': 'odp',
    'application/vnd.oasis.opendocument.spreadsheet': 'ods',
    'application/vnd.oasis.opendocument.text': 'odt',
    'audio/ogg': 'oga',
    'video/ogg': 'ogv',
    'application/ogg': 'ogx',
    'audio/opus': 'opus',
    'font/otf': 'otf',
    'image/x-portable-bitmap': 'pbm',
    'application/pdf': 'pdf',
    'image/x-portable-graymap': 'pgm',
    'application/x-httpd-php': 'php',
    'image/png': 'png',
    'image/x-portable-anymap': 'pnm',
    'image/x-portable-pixmap': 'ppm',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
    'application/vnd.rar': 'rar',
    'image/x-cmu-raster': 'ras',
    'image/x-rgb': 'rgb',
    'application/rtf': 'rtf',
    'application/x-sh': 'sh',
    'image/svg+xml': 'svg',
    'application/x-tar': 'tar',
    'image/tiff': 'tiff',
    'video/mp2t': 'ts',
    'font/ttf': 'ttf',
    'text/plain': 'txt',
    'application/vnd.visio': 'vsd',
    'audio/wav': 'wav',
    'audio/webm': 'weba',
    'video/webm': 'webm',
    'image/webp': 'webp',
    'font/woff': 'woff',
    'font/woff2': 'woff2',
    'image/x-xbitmap': 'xbm',
    'application/xhtml+xml': 'xhtml',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/xml': 'xml',
    'image/x-xpixmap': 'xpm',
    'application/vnd.mozilla.xul+xml': 'xul',
    'image/x-xwindowdump': 'xwd',
    'application/zip': 'zip',
  };

  const extValue = extension[mimeType];

  if (extValue) {
    return extValue;
  }

  return 'jpg';
};