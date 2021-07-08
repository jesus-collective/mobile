const replyCounter = (replies) => {
  let countString = "No comments"
  if (replies) {
    if (replies?.length > 0) {
      let replyCounter: number = replies?.length
      replies?.forEach((reply) => {
        replyCounter += reply?.replies?.length ?? 0
      })
      countString = `${replyCounter} comments`
    }
  }
  return countString
}

export { replyCounter }
