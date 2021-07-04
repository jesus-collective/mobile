const replyCounter = (replies) => {
  let countString = ""
  if (replies) {
    if (replies?.length === 1) countString = "1 comment"
    if (replies?.length > 1) {
      let replyCounter: number = replies?.length
      replies?.forEach((reply) => {
        replyCounter += reply?.replies?.length ?? 0
      })
      countString = `${replyCounter} comments`
    }
  }
  if (replies?.length === 0) countString = "No comments"
  return countString
}

export { replyCounter }
