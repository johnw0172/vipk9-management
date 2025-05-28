#!/bin/bash

echo "# 🏆 VIP Elite K9s - COMPLETE WORKING CODE EXPORT" > FULL-SYSTEM-CODE.md
echo "" >> FULL-SYSTEM-CODE.md
echo "**Every single line of your working VIP Elite K9s system!**" >> FULL-SYSTEM-CODE.md
echo "" >> FULL-SYSTEM-CODE.md

# Add each file with its content
for file in package.json tsconfig.json vite.config.ts tailwind.config.ts drizzle.config.ts postcss.config.js components.json; do
  if [ -f "$file" ]; then
    echo "---" >> FULL-SYSTEM-CODE.md
    echo "" >> FULL-SYSTEM-CODE.md
    echo "## 📄 $file" >> FULL-SYSTEM-CODE.md
    echo '```json' >> FULL-SYSTEM-CODE.md
    cat "$file" >> FULL-SYSTEM-CODE.md
    echo '```' >> FULL-SYSTEM-CODE.md
    echo "" >> FULL-SYSTEM-CODE.md
  fi
done

# Add TypeScript config files
for file in shared/schema.ts server/*.ts; do
  if [ -f "$file" ]; then
    echo "---" >> FULL-SYSTEM-CODE.md
    echo "" >> FULL-SYSTEM-CODE.md
    echo "## 📄 $file" >> FULL-SYSTEM-CODE.md
    echo '```typescript' >> FULL-SYSTEM-CODE.md
    cat "$file" >> FULL-SYSTEM-CODE.md
    echo '```' >> FULL-SYSTEM-CODE.md
    echo "" >> FULL-SYSTEM-CODE.md
  fi
done

# Add client files
for file in client/index.html client/src/main.tsx client/src/App.tsx client/src/index.css; do
  if [ -f "$file" ]; then
    echo "---" >> FULL-SYSTEM-CODE.md
    echo "" >> FULL-SYSTEM-CODE.md
    echo "## 📄 $file" >> FULL-SYSTEM-CODE.md
    if [[ "$file" == *.html ]]; then
      echo '```html' >> FULL-SYSTEM-CODE.md
    elif [[ "$file" == *.css ]]; then
      echo '```css' >> FULL-SYSTEM-CODE.md
    else
      echo '```typescript' >> FULL-SYSTEM-CODE.md
    fi
    cat "$file" >> FULL-SYSTEM-CODE.md
    echo '```' >> FULL-SYSTEM-CODE.md
    echo "" >> FULL-SYSTEM-CODE.md
  fi
done

# Add lib files
for file in client/src/lib/*.ts; do
  if [ -f "$file" ]; then
    echo "---" >> FULL-SYSTEM-CODE.md
    echo "" >> FULL-SYSTEM-CODE.md
    echo "## 📄 $file" >> FULL-SYSTEM-CODE.md
    echo '```typescript' >> FULL-SYSTEM-CODE.md
    cat "$file" >> FULL-SYSTEM-CODE.md
    echo '```' >> FULL-SYSTEM-CODE.md
    echo "" >> FULL-SYSTEM-CODE.md
  fi
done

# Add hooks
for file in client/src/hooks/*.ts client/src/hooks/*.tsx; do
  if [ -f "$file" ]; then
    echo "---" >> FULL-SYSTEM-CODE.md
    echo "" >> FULL-SYSTEM-CODE.md
    echo "## 📄 $file" >> FULL-SYSTEM-CODE.md
    echo '```typescript' >> FULL-SYSTEM-CODE.md
    cat "$file" >> FULL-SYSTEM-CODE.md
    echo '```' >> FULL-SYSTEM-CODE.md
    echo "" >> FULL-SYSTEM-CODE.md
  fi
done

# Add pages
for file in client/src/pages/*.tsx; do
  if [ -f "$file" ]; then
    echo "---" >> FULL-SYSTEM-CODE.md
    echo "" >> FULL-SYSTEM-CODE.md
    echo "## 📄 $file" >> FULL-SYSTEM-CODE.md
    echo '```typescript' >> FULL-SYSTEM-CODE.md
    cat "$file" >> FULL-SYSTEM-CODE.md
    echo '```' >> FULL-SYSTEM-CODE.md
    echo "" >> FULL-SYSTEM-CODE.md
  fi
done

# Add components
for file in client/src/components/*.tsx; do
  if [ -f "$file" ]; then
    echo "---" >> FULL-SYSTEM-CODE.md
    echo "" >> FULL-SYSTEM-CODE.md
    echo "## 📄 $file" >> FULL-SYSTEM-CODE.md
    echo '```typescript' >> FULL-SYSTEM-CODE.md
    cat "$file" >> FULL-SYSTEM-CODE.md
    echo '```' >> FULL-SYSTEM-CODE.md
    echo "" >> FULL-SYSTEM-CODE.md
  fi
done

echo "✅ Complete export created: FULL-SYSTEM-CODE.md"
