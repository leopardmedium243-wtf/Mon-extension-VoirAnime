export default class VoirAnime {
  constructor() {
    this.baseUrl = "https://v6.voiranime.com";
  }

  async search(query) {
    const res = await fetch(`${this.baseUrl}/?s=${encodeURIComponent(query)}&post_type=wp-manga`);
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const items = doc.querySelectorAll(".asp_res_image_url");
    
    return Array.from(items).map((item) => {
      const imgElement = item.querySelector("img");
      return {
        title: imgElement ? imgElement.getAttribute("alt") : "Titre inconnu",
        url: item.href,
        cover: imgElement ? imgElement.src : ""
      };
    });
  }

  async watch(url) {
    // Pour l'instant, cela renvoie vers la page de l'animé
    return { type: "hls", url: url };
  }
}
