document.addEventListener('DOMContentLoaded', () => {
    const editTable = document.getElementById('editTable');
    const saveButton = document.getElementById('saveButton');
    const importButton = document.getElementById('importButton');
    const excelFileInput = document.getElementById('excelFile');

    // Загружаем данные из localStorage для редактирования
    let tableData = JSON.parse(localStorage.getItem('tableData')) || [
        ["Муборак заводи", 0, 0, 0, 0, 0],
        ["Шўртан НГЧБ", 0, 0, 0, 0, 0],
        ["Шўртан ГКМ", 0, 0, 0, 0, 0],
        ["Бухоро НКИЗ", 0, 0, 0, 0, 0],
        ["Лукойл", 0, 0, 0, 0, 0],
        ["NSROG", 0, 0, 0, 0, 0],
        ["SANEG", 0, 0, 0, 0, 0]
    ];

    // Отображаем таблицу на странице редактирования
    tableData.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach((cell, colIndex) => {
            const td = document.createElement('td');
            td.contentEditable = true; // Делаем ячейки редактируемыми
            td.textContent = cell;
            td.addEventListener('input', () => {
                tableData[rowIndex][colIndex] = td.textContent;
            });
            tr.appendChild(td);
        });
        editTable.appendChild(tr);
    });

    // Сохранение данных и возврат на главную страницу
    saveButton.addEventListener('click', () => {
        localStorage.setItem('tableData', JSON.stringify(tableData));
    });

    // Импорт данных из Excel
    importButton.addEventListener('click', () => {
        const file = excelFileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

                // Заменим текущие данные на импортированные
                tableData = jsonData.slice(1); // Пропускаем заголовок
                updateTable();
            };
            reader.readAsBinaryString(file);
        }
    });

    // Функция для обновления таблицы после импорта
    function updateTable() {
        editTable.innerHTML = ''; // Очищаем таблицу
        tableData.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');
            row.forEach((cell, colIndex) => {
                const td = document.createElement('td');
                td.contentEditable = true; // Делаем ячейки редактируемыми
                td.textContent = cell;
                td.addEventListener('input', () => {
                    tableData[rowIndex][colIndex] = td.textContent;
                });
                tr.appendChild(td);
            });
            editTable.appendChild(tr);
        });
    }
});
