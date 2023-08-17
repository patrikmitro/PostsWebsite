export function getPostDuration(timestamp) {
  const postDate = new Date(timestamp);
  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - postDate.getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    const year = postDate.getFullYear();
    const month = postDate.toLocaleString("en-US", { month: "short" });
    const day = postDate.getDate();
    return `${year} ${month} ${day}`;
  } else if (months > 0) {
    const month = postDate.toLocaleString("en-US", { month: "short" });
    const day = postDate.getDate();
    return `${month} ${day}`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (seconds > 30) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else {
    return "Now";
  }
}
