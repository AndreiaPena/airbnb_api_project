module.exports =  {
    
  oups: function (placeId, check_in, check_out) {
    if (placeId === null || placeId === undefined || placeId === '') {
        return res.status(400).json({
          error: "Le champ placeId n'est pas renseigné",
        });
      }
  
      if (Date.parse(check_in).toString() === 'NaN') {
        return res.status(400).json({
          error:
            'Le champ check_in doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC',
        });
      }
  
      const checkInParsed = new Date(Date.parse(check_in));
  
      if (
        checkInParsed.toISOString() !== check_in ||
        checkInParsed.toUTCString() !== new Date(check_in).toUTCString()
      ) {
        return res.status(400).json({
          error:
            'Le champ check_in doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC',
        });
      }
  
      if (Date.parse(check_out).toString() === 'NaN') {
        return res.status(400).json({
          error:
            'Le champ check_out doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC',
        });
      }
  
      const checkOutParsed = new Date(Date.parse(check_out));
  
      if (
        checkOutParsed.toISOString() !== check_out ||
        checkOutParsed.toUTCString() !== new Date(check_out).toUTCString()
      ) {
        return res.status(400).json({
          error:
            'Le champ check_out doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC',
        });
      }
}
}