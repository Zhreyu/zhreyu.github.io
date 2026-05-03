#!/bin/bash

# Fetch all language bytes using authenticated gh CLI
OUTPUT_FILE="src/data/github-stats.json"

echo "Fetching GitHub stats using gh CLI..."

# Get language totals across all repos
LANG_DATA=$(gh api users/Zhreyu/repos --paginate --jq '.[].full_name' | while read repo; do
  gh api "repos/$repo/languages" 2>/dev/null
done | jq -s '
  reduce .[] as $item ({};
    reduce ($item | to_entries[]) as $lang (.;
      .[$lang.key] += $lang.value
    )
  )')

# Get repo count
REPO_COUNT=$(gh api users/Zhreyu --jq '.public_repos')

# Calculate LOC (bytes / 50)
PYTHON=$(echo "$LANG_DATA" | jq -r '.Python // 0 | . / 50 | floor')
TYPESCRIPT=$(echo "$LANG_DATA" | jq -r '.TypeScript // 0 | . / 50 | floor')
CUDA=$(echo "$LANG_DATA" | jq -r '.Cuda // 0 | . / 50 | floor')
JAVA=$(echo "$LANG_DATA" | jq -r '.Java // 0 | . / 50 | floor')
JAVASCRIPT=$(echo "$LANG_DATA" | jq -r '.JavaScript // 0 | . / 50 | floor')

# Get contribution count
CONTRIBUTIONS=$(gh api graphql -f query='{ user(login: "Zhreyu") { contributionsCollection { contributionCalendar { totalContributions } } } }' --jq '.data.user.contributionsCollection.contributionCalendar.totalContributions')

# Create JSON
cat > "$OUTPUT_FILE" << EOF
{
  "python": $PYTHON,
  "typescript": $TYPESCRIPT,
  "cuda": $CUDA,
  "java": $JAVA,
  "javascript": $JAVASCRIPT,
  "totalRepos": $REPO_COUNT,
  "contributions": $CONTRIBUTIONS,
  "updatedAt": "$(date -Iseconds)"
}
EOF

echo "Stats written to $OUTPUT_FILE"
cat "$OUTPUT_FILE"
