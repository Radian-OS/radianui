import React from "react"
import { CodeArea } from "@/styles/default/ui/code-area"

const CodeLanguageExample = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<CodeArea
				className="max-w-150 w-full"
				language="tsx"
				theme="tokyo-night"
				code={`// TypeScript React
const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};`}
			/>

			<CodeArea
				className="max-w-150 w-full"
				language="python"
				theme="tokyo-night"
				code={`# Python
def calculate_fibonacci(n: int) -> int:
    if n <= 1:
        return n
    
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    
    return b

# Example usage
result = calculate_fibonacci(10)
print(f"Fibonacci(10) = {result}")`}
			/>

			<CodeArea
				className="max-w-150 w-full"
				language="java"
				theme="tokyo-night"
				code={`// Java
public class UserService {
    private final UserRepository repository;
    
    public UserService(UserRepository repository) {
        this.repository = repository;
    }
    
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }
    
    public User save(User user) {
        user.setUpdatedAt(LocalDateTime.now());
        return repository.save(user);
    }
}`}
			/>

			<CodeArea
				language="javascript"
				className="max-w-150 w-full"
				theme="tokyo-night"
				code={`// JavaScript
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};`}
			/>

			<CodeArea
				className="max-w-150 w-full"
				language="bash"
				theme="tokyo-night"
				code={`#!/bin/bash
# Build and deploy script

echo "Starting build process..."

# Install dependencies
npm install

# Run tests
npm test

# Build the application
npm run build

# Deploy to production
if [ "$1" == "prod" ]; then
  echo "Deploying to production..."
  rsync -avz ./dist/ user@server:/var/www/app/
  echo "Deployment complete!"
else
  echo "Building for staging..."
fi`}
			/>

			<CodeArea
				className="max-w-150 w-full"
				language="sql"
				theme="tokyo-night"
				code={`-- SQL
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(o.id) as order_count,
    SUM(o.total_amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
    AND u.status = 'active'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 10;`}
			/>
		</div>
	)
}

export default CodeLanguageExample
