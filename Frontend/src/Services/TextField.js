function getListaFiltrosText() {
  const filtros = [
    "Habitaciones",
    "Baños",
    "Ascensor",
    "Tipo",
    "Estado",
    "Exterior",
  ];
  return filtros;
}
function getFiltroEN(filtro) {
  switch (filtro) {
    case "Habitaciones":
      return "rooms";
    case "Ascensor":
      return "hasLift";
    case "Baños":
      return "bathrooms";
    case "Tipo":
       console.log("eeoeoeoeoe")
      return "propertyType";
    case "Exterior":
      return "exterior";
    case "Estado":
      return "status";
  }
}

function getFiltrosValue(nombre) {
  switch (nombre) {
    case "Habitaciones":
      return [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" },
      ];
    case "Ascensor":
      return [
        { value: true, label: "SI" },
        { value: false, label: "NO" },
      ];

    case "Baños":
      return [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
      ];
    case "Tipo":
      return [
        { value: "flat", label: "Piso" },
        { value: "studio", label: "Estudios" },
        { value: "duplex", label: "Duplex" },
        { value: "penthouse", label: "Atico" },
        { value: "chalet", label: "Chalet" },
      ];
    case "Estado":
      return [
        { value: "good", label: "Buen estado" },
        { value: "newdevelopment", label: "Nueva construcción" },
        { value: "Para reformar", label: "renew" },
      ];
    case "Exterior":
      return [
        { value: true, label: "SI" },
        { value: false, label: "NO" },
      ];
  }
}
module.exports = { getListaFiltrosText, getFiltrosValue,getFiltroEN};
