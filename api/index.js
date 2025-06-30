import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://www.tipminer.com/br/historico/blaze/double');
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const items = [...document.querySelectorAll('.entry')].map(entry => {
      const color = entry.classList.contains('white')
        ? 'white'
        : entry.classList.contains('red')
        ? 'red'
        : 'black';

      const number = entry.textContent.trim();
      return { color, number };
    });

    res.status(200).json({ results: items });
  } catch (err) {
    console.error('Erro ao carregar dados:', err);
    res.status(500).json({ error: 'Erro ao carregar dados' });
  }
}
