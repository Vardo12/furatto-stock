// Reemplaza tu exportCsv.addEventListener('click', ...) por esta versión
exportCsv.addEventListener('click', () => {
  if (!products.length) { alert('Nada para exportar'); return; }

  // Cabeceras visibles en Excel
  const headers = ['Producto', 'Cantidad', 'Fecha'];

  // Construir filas; usamos ; como separador (mejor para Excel en muchos locales)
  const rows = products.map(p => {
    const name = (p.name || '').replace(/"/g, '""');
    const qty  = (p.qty  === null ? '' : String(p.qty)).replace(/"/g, '""');
    const date = (p.date === null ? '' : String(p.date)).replace(/"/g, '""');
    return `"${name}";"${qty}";"${date}"`;
  });

  // UTF-8 BOM para que Excel reconozca correctamente caracteres acentuados
  const bom = '\uFEFF';
  const csvContent = bom + headers.join(';') + '\n' + rows.join('\n');

  // Descargar archivo
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `furatto_stock_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1000);
});
