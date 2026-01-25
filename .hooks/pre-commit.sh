#!/usr/bin/env bash
set -euo pipefail

function block() {
    echo -e "\n\n"
    echo "$@"
    echo "[ERROR] Commit blocked."
    exit 1
}

function format() {
    local extensions=("*.js" "*.jsx" "*.json" "*.yml" "*.css" "*.html" "*.md")
    mapfile -d '' -t staged_files < <(git diff --cached --name-only -z --diff-filter=ACMR -- "${extensions[@]}" || true)

    if ((${#staged_files[@]} == 0)); then
        return 0
    fi

    if ! pnpm exec -- prettier --log-level error --check "${staged_files[@]}"; then
        block "Formatting issues found."
    fi
}

function lint() {
    local extensions=("*.js" "*.jsx")
    mapfile -d '' -t staged_files < <(git diff --cached --name-only -z --diff-filter=ACMR -- "${extensions[@]}" || true)

    if ((${#staged_files[@]} == 0)); then
        return 0
    fi

    if ! pnpm exec -- eslint --max-warnings 0 -- "${staged_files[@]}"; then
        block "Linting issues found."
    fi
}

CHECKS="format lint"

for CHECK in $CHECKS; do
    ($CHECK) || exit $?
done
