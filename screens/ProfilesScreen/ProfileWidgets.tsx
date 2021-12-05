import React from "react"
import PeopleListWidget from "../../components/FaceLift/PeopleListWidget"

export default function ProfileWidgets() {
  return (
    <>
      <PeopleListWidget
        emptyMessage="No members in your org"
        loadData={() =>
          Promise.resolve([
            { id: "1d9eed76-82ff-4ddc-b2ae-3eb5c597cc52" },
            { id: "1d9eed76-82ff-4ddc-b2ae-3eb5c597cc52" },
            { id: "1d9eed76-82ff-4ddc-b2ae-3eb5c597cc52" },
            { id: "1d9eed76-82ff-4ddc-b2ae-3eb5c597cc52" },
            { id: "1d9eed76-82ff-4ddc-b2ae-3eb5c597cc52" },
            { id: "1d9eed76-82ff-4ddc-b2ae-3eb5c597cc52" },
            { id: "1d9eed76-82ff-4ddc-b2ae-3eb5c597cc52" },
            { id: "1d9eed76-82ff-4ddc-b2ae-3eb5c597cc52" },
          ])
        }
        title="In Your org"
      />

      <PeopleListWidget
        emptyMessage="No people in groups with you"
        loadData={() => Promise.resolve([])}
        title="In groups with you"
      />
    </>
  )
}
