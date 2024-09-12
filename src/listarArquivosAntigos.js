import moment from "moment";
import deletaObjetosNoBucket from "./deletaObjetosNoBucket.js";

var arquivosAhSeremDeletados = [];

export default function listarArquivosAntigos(datas) {
  var datasFormatadas = [];
  var datasArquivosDoBucket = [];
  var dataDeCorteDosBackups = moment().subtract(10, "days");
  dataDeCorteDosBackups = moment(dataDeCorteDosBackups).format("YYYY-MM-DD");
  datas.forEach((data) => {
    var regex = /(\d{4}-\d{2}-\d{2})/;
    datasArquivosDoBucket.push(regex.exec(data));
  });

  for (let i = 0; i < datasArquivosDoBucket.length; i++) {
    if (moment(datasArquivosDoBucket[i][1]).isBefore(dataDeCorteDosBackups))
      arquivosAhSeremDeletados.push(datasArquivosDoBucket[i].input);
  }
  arquivosAhSeremDeletados.forEach((arquivo) => {
    deletaObjetosNoBucket(arquivo);
  });
}
