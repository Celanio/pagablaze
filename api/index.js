import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://www.tipmener.com/br/historico/blaze/double');
    const html = await response.text();
    const $ = cheerio.load(html);

    const results = [];

    $('.entry').each((_, el) => {
      const text = $(el).text().trim();
      const classes = $(el).attr('class');

      let color = 'black';
      if (classes.includes('white')) color = 'white';
      else if (classes.includes('red')) color = 'red';

      results.push({ color, number: text });
    });

    res.status(200).json({ results });
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    res.status(500).json({ error: 'Erro ao carregar dados' });
  }
}
