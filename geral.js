// Importar as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2x2m-B8sKvLeuZ3Ux7TzL0yOjxd_623M",
  authDomain: "base-pe.firebaseapp.com",
  databaseURL: "https://base-pe-default-rtdb.firebaseio.com/",
  projectId: "base-pe",
  storageBucket: "base-pe.appspot.com",
  messagingSenderId: "464810291604",
  appId: "1:464810291604:web:e813b0f265c81bbdae1f81",
  measurementId: "G-T2VPE4DWCJ"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referência ao banco de dados
const dbRef = ref(database, "spreadsheetData");

// Configuração da planilha
const container = document.getElementById("spreadsheet");
let hot;

// Inicializar a planilha com as configurações necessárias
function initializeSpreadsheet(data) {
    hot = new Handsontable(container, {
      data: data || [[]],  // Usar dados do Firebase ou inicializar vazio
      colHeaders: true,
      rowHeaders: true,
      contextMenu: ['row_above', 'row_below', 'remove_row', 'col_left', 'col_right', 'remove_col'], // Definindo o menu de contexto com as opções de inserir/retirar linha/coluna
      licenseKey: "non-commercial-and-evaluation",  // Use a chave adequada
      afterChange: (changes, source) => {
        if (source === "edit") {
          saveDataToFirebase();  // Salvar dados ao editar
        }
      },
      afterCreateRow: (index, amount, source) => {
        // Atualizar Firebase após criação de linha
        saveDataToFirebase();
      },
      afterRemoveRow: (index, amount, source) => {
        // Atualizar Firebase após remoção de linha
        saveDataToFirebase();
      },
      afterCreateCol: (index, amount, source) => {
        // Atualizar Firebase após criação de coluna
        saveDataToFirebase();
      },
      afterRemoveCol: (index, amount, source) => {
        // Atualizar Firebase após remoção de coluna
        saveDataToFirebase();
      }
    });
  }  

// Carregar os dados do Firebase
onValue(dbRef, (snapshot) => {
  const data = snapshot.val() || [[]];
  if (hot) {
    hot.loadData(data);
  } else {
    initializeSpreadsheet(data);
  }
});

// Salvar os dados no Firebase
function saveDataToFirebase() {
  const data = hot.getData();
  set(dbRef, data).catch((error) => {
    console.error("Erro ao salvar os dados no Firebase:", error);
  });
}
