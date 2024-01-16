export function loadImage(rep, file) {
    let img=require(`@/assets/img/${rep}/none.png`);
    if(file!=null)
    {
      try {
        img=require(`@/assets/img/${rep}/${file}`);
      } 
      catch (error) {
        console.log("error loadImage");
        //console.error(error);
      }
    }
    return img;
}

export function prixDA(prix) {
    return prix.toString() + ".00 DA";
}