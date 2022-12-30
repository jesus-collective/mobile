export const Brand = (): "oneStory" | "jc" | null => {
  const brandParam = "jc"
  let brand
  if (brandParam === "jc") brand = "jc"
  else if (brandParam === "oneStory") brand = "oneStory"
  else if (window.location.hostname.includes("onestorycurriculum")) brand = "oneStory"
  else if (window.location.hostname.includes("jesuscollective")) brand = "jc"
  else brand = "jc"

  return brand as "oneStory" | "jc" | null
}
