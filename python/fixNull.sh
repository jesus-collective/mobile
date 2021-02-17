python3 fix_null_values.py \
  --table 'Resource-kmlktiovonfg5acdl3gn7tx7pq-beta'  \
  --column 'readGroups'  \
  --default '[ { "S" : "verifiedUsers" } ]'  \
  --type 'L' \
  --rn 'us-east-1'  
  

  python3 fix_null_values.py \
  --table 'Resource-2ht5eyf3rfct7f3slbiz6sme5u-dev'  \
  --column 'readGroups'  \
  --default '[ { "S" : "verifiedUsers" } ]'  \
  --type 'L' \
  --rn 'us-east-1'  
