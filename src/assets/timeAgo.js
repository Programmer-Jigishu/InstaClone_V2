function timeAgo(timeToCheck) {

    const timeDifference = Date.now() - timeToCheck;
    const minutes = Math.floor(timeDifference / (60 * 1000));
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    const seconds = Math.floor(timeDifference / 1000);

    let theTime;

    if (days > 1) {
        theTime = `${days} days ago`;
    } else if (hours > 1) {
        theTime = `${hours} hours ago`;
    } else if (minutes > 1) {
        theTime = `${minutes} minutes ago`;
    } else {
        theTime = `${seconds} seconds ago`;
    }
    return theTime;
}

export default timeAgo