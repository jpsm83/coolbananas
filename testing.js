let session =
  '{"ewons":[{"id":1480617,"name":"Telstar","encodedName":"Telstar","status":"online","description":"","customAttributes":["","",""],"m2webServer":"eu2.m2web.talk2m.com","lanDevices":[],"ewonServices":[]}],"success":true}'

  let ewonName;

  const getEwonName = (str) => {
    if (str.includes("name")) {
      console.log(str.split('"')[7])
      // ewonName = str.split('"')[3];
    } else {
    ewonName = "Too many concurrent connections";
      }
  };
  
  getEwonName(session);
  console.log(ewonName);
