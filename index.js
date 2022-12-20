require('dotenv').config();
const telegramBot = require('node-telegram-bot-api');
const express = require("express");
const path = require("path");
const token = process.env.TOKEN;
const bot = new telegramBot(token, {polling: true});
const webAppUrl = 'https://clean-city.onrender.com/';
const app = express();

app.use(express.static(path.resolve(__dirname, "static")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Running on port " + PORT));

const keyboard = [
    [
        {text: 'Скачать схему',
        callback_data: 'scheme'}
    ],
    [
        {text: 'Рандомный мем',
        callback_data: 'random'}
    ],
    [
        {text: 'Заказать услугу клининга',
        web_app: {url: webAppUrl}}
    ]
];
const start = async () => {
try {
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start') {
        bot.sendMessage(chatId, 'Выберите опцию', {
            reply_markup: {
                inline_keyboard: keyboard
            }
        })

    }
})

bot.on('callback_query', async (query)=> {
    const chatId = query.message.chat.id;
    if (query.data === 'scheme') {
        await bot.sendMessage(chatId, "Отправляю Вашу схему!");
        await bot.sendDocument(chatId, "./static/shema.pdf");
       
    }
    if (query.data === 'random') {
        const randomNumber = Math.floor(Math.random() * 2) + 1;
        await bot.sendPhoto(chatId, `./static/images/${randomNumber}.png`);
       
    }

    if (query.data === 'cleaning') {
            await bot.sendMessage(chatId, 'Если нужны услуги клининга, выбери "Заполнить форму" ниже', {
}
)
return bot.sendMessage(
    chatId,
    "Ваша команда не распознана, попробуйте еще раз!"
  );
    }
    await bot.sendMessage(chatId, 'Выберите опцию', {
        reply_markup: {
            inline_keyboard: keyboard
        }
    })
})
} 
catch (error) {
    console.log(error)
}
}
start()