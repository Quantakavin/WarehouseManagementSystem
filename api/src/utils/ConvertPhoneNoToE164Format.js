const ConvertMobileNo = (mobileNo) => {
    console.log('Mobile no is ', mobileNo);
    let returnNo = null;
    if (mobileNo.startsWith('+65')) {
        if (mobileNo.charAt(3) === ' ') {
            returnNo = mobileNo.slice(0, 3) + mobileNo.slice(4);
        } else {
            returnNo = mobileNo;
        }
    } else if (/^\d/.test(mobileNo)) {
        returnNo = `+65${mobileNo}`;
    } else if (mobileNo.startsWith('(65)')) {
        if (mobileNo.charAt(4) === ' ') {
            returnNo = `+65${mobileNo.slice(5)}`;
        } else {
            returnNo = `+65${mobileNo.slice(4)}`;
        }
    } else if (mobileNo.startsWith('(+65)')) {
        if (mobileNo.charAt(5) === ' ') {
            returnNo = `+65${mobileNo.slice(6)}`;
        } else {
            returnNo = `+65${mobileNo.slice(5)}`;
        }
    }
    return returnNo;
};

module.exports = ConvertMobileNo;
