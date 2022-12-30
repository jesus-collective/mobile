export const Brand = (): "oneStory" | "jc" | null => {
  const params = new URLSearchParams(window.location.search)
  const brandParam = params.get("brand")
  let brand
  if (brandParam === "jc") brand = "jc"
  else if (brandParam === "oneStory") brand = "oneStory"
  else if (window.location.hostname.includes("onestorycurriculum")) brand = "oneStory"
  else if (window.location.hostname.includes("jesuscollective")) brand = "jc"
  else brand = "jc"

  return brand as "oneStory" | "jc" | null
}
