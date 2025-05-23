const axios = require('axios');

let PriyaPrefix = [
  'shadow',
  '.ai', 
  'mitsuha' // Added Mitsuha as a prefix
];

const axiosInstance = axios.create();

module.exports = {
  config: {
    name: 'shadow',
    version: '2.2.0',
    role: 0,
    category: 'AI',
    author: 'Priyanshi || Priyansh',
    shortDescription: 'Artificial Intelligence',
    longDescription: 'Ask Anything To AI For Your Answers',
  },

  onStart: async function () {},

  onChat: async function ({ message, event, args, api, threadID, messageID }) {
    const command = args[0].toLowerCase();

    // Help Command
    if (command === '🏴‍☠️') {
      const helpMessage = `
      🌟 *AI Commands* 🌟
      - Prefixes: ${PriyaPrefix.join(', ')}
      - Add Prefix: addprefix <prefix>
      - AI Query: ${PriyaPrefix[0]} <your query>
      - Say Hi: hi
      `;
      await message.reply(helpMessage);
      return;
    }

    // Add New Prefix Command
    if (command === 'addprefix') {
      const newPrefix = args[1];
      if (newPrefix && !PriyaPrefix.includes(newPrefix)) {
        PriyaPrefix.push(newPrefix);
        await message.reply(`New prefix "${newPrefix}" added successfully!`);
      } else {
        await message.reply('Please provide a valid and unique prefix.');
      }
      return;
    }

    // Check for prefixes in the message
    const ahprefix = PriyaPrefix.find((p) => event.body && event.body.toLowerCase().startsWith(p));
    if (!ahprefix) {
      return;
    }

    const priya = event.body.substring(ahprefix.length).trim();
    if (!priya) {
      await message.reply('𝙝𝙚𝙮  𝙩𝙖 𝙦𝙪𝙚𝙨𝙩𝙞𝙤𝙣... ?🥹 ');
      return;
    }

    const apply = [
      '𝚎𝚗𝚝𝚎𝚛 (𝚚)*',
      '𝙷𝚘𝚠 𝙲𝚊𝚗 𝙸 𝙷𝚎𝚕𝚙 𝚈𝚘𝚞?',
      '𝚀𝚞𝚊𝚛𝚢 𝙿𝚕𝚎𝚊𝚜𝚎....',
      '𝙷𝚘𝚠 𝙲𝚊𝚗 𝙸 𝙰𝚜𝚜𝚒𝚜𝚝 𝚈𝚘𝚞?',
      '𝙶𝚛𝚎𝚎𝚝𝚒𝚗𝚐𝚜!',
      '𝙸𝚜 𝚃𝚑𝚎𝚛𝚎 𝚊𝚗𝚢𝚝𝚑𝚒𝚗𝚐 𝙴𝚕𝚜𝚎 𝙸 𝙲𝚊𝚗 𝙳𝚘?'
    ];
    const randomapply = apply[Math.floor(Math.random() * apply.length)];

    if (command === 'hi') {
      await message.reply(randomapply);
      return;
    }

    const encodedPrompt = encodeURIComponent(args.join(' '));

    await message.reply('⏱️|𝗽𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁.....'); 

    try {
      const response = await axiosInstance.get(`https://priyansh-ai.onrender.com/gemini/ai?query=${encodedPrompt}`);
      const Priya = response.data;
      const priyares = `${Priya}`;
      await message.reply(priyares);
    } catch (error) {
      await message.reply('Oops! Something went wrong. Please try again later.');
    }
  }
};
