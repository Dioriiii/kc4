import moment from "moment";
moment.locale("ko");
const m = moment();
console.log(m.format("llll"));
console.log(m.format("YY-MM-DD HH:mm:ss"));
