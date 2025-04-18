document.addEventListener('DOMContentLoaded', () => {
    const dataTable = document.getElementById('dataTable');

    // Загружаем данные из localStorage и отображаем таблицу
    const tableData = JSON.parse(localStorage.getItem('tableData')) || [
        ["Муборак заводи", 0, 0, 0, 0, 0],
        ["Шўртан НГЧБ", 0, 0, 0, 0, 0],
        ["Шўртан ГКМ", 0, 0, 0, 0, 0],
        ["Бухоро НКИЗ", 0, 0, 0, 0, 0],
        ["Лукойл", 0, 0, 0, 0, 0],
        ["NSROG", 0, 0, 0, 0, 0],
        ["SANEG", 0, 0, 0, 0, 0]
    ];

    tableData.forEach((row) => {
        const tr = document.createElement('tr');
        row.forEach((cell) => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        dataTable.appendChild(tr);
    });
});
