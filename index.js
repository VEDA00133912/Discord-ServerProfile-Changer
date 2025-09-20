require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');
const { request } = require('undici');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN = process.env.TOKEN;
const API_BASE = 'https://discord.com/api/v10';

function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

function getRandomImageData(dir) {
  const files = fs.readdirSync(dir).filter(f =>
    f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.webp')
  );
  if (files.length === 0) return null;

  const file = files[Math.floor(Math.random() * files.length)];
  const buffer = fs.readFileSync(path.join(dir, file));
  const base64 = buffer.toString('base64');

  let mime = 'image/jpeg';
  if (file.endsWith('.png')) mime = 'image/png';
  else if (file.endsWith('.webp')) mime = 'image/webp';

  return `data:${mime};base64,${base64}`;
}

async function patchGuildMemberProfile(guildId, body) {
  const res = await request(`${API_BASE}/guilds/${guildId}/members/@me`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bot ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.body.json().catch(() => ({}));
  return { status: res.statusCode, data };
}

client.once(Events.ClientReady, async () => {
  console.log(`${client.user.tag} ログイン成功`);

  client.guilds.cache.forEach(guild => {
    console.log(`- ${guild.name} (ID: ${guild.id})`);
  });
  console.log('');

  for (const [guildId, guild] of client.guilds.cache) {
    const avatar = getRandomImageData('./icons');
    const banner = getRandomImageData('./banners');

    if (!avatar || !banner) {
      console.warn('icons/または banners/に画像がありません');
      continue;
    }

    const body = {
      bio: `${guild.name}に参加しています！`,
      avatar,
      banner,
    };

    console.log(`更新中: ${guild.name}`);
    const res = await patchGuildMemberProfile(guildId, body);
    console.log(`→ ${guild.name}: status ${res.status}`);

    await sleep(1000);
  }

  console.log('全サーバープロフィール更新完了');
});

client.login(TOKEN);
