const ReplaceAlphanumericString = (stringtoreplace: string, numbertoadd: number) => {
    const finalstring = stringtoreplace.replace(/\d+$/, (n) => { 
        const newnumber = parseInt(n) + numbertoadd;
        if (newnumber < 10) {
            return "0" + newnumber.toString()
        }
        return newnumber.toString();
    } );
    return finalstring;
}

export default ReplaceAlphanumericString;