const subscribeMsg = {
    event: "bts:subscribe",
    data: {
      channel: "order_book_btcusd"
    }
};

const PATH_FILE = "./files/order_book_btcusd.json";
const WEB_API = "wss://ws.bitstamp.net";

module.exports = Object.freeze({
    SUB_API: subscribeMsg,
    PATH_FILE: PATH_FILE,
    WEB_API: WEB_API,
    WATCH_TIME: { interval: 1000 }
});