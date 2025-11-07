// Lógica de la playlist de videos
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video-principal');
  const source = document.getElementById('video-source');
  const tracks = document.querySelectorAll('.track');

  if (!video || !source || !tracks.length) return;

  tracks.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.dataset.src;
      const poster = btn.dataset.poster || '';

      if (src && source.getAttribute('src') !== src) {
        source.setAttribute('src', src);
        if (poster) video.setAttribute('poster', poster);
        video.load();
        video.play().catch(()=>{});
      }

      tracks.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});
