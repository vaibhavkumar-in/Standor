export interface Problem {
    id: string
    title: string
    difficulty: 'EASY' | 'MEDIUM' | 'HARD'
    category: string
    tags: string[]
    description: string
    examples: { input: string; output: string; explanation?: string }[]
    starterCode: Record<string, string>
    testCases: { input: string; expected: string; hidden: boolean }[]
}

export const DEMO_PROBLEMS: Problem[] = [
    {
        id: '1',
        title: 'Two Sum',
        difficulty: 'EASY',
        category: 'Arrays',
        tags: ['Hash Table', 'Array'],
        description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
        examples: [
            {
                input: 'nums = [2,7,11,15], target = 9',
                output: '[0,1]',
                explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
            }
        ],
        starterCode: {
            javascript: 'function twoSum(nums, target) {\n  // your code\n}',
            python: 'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass'
        },
        testCases: [
            { input: '2 7 11 15\n9', expected: '0 1', hidden: false },
            { input: '3 2 4\n6', expected: '1 2', hidden: false }
        ]
    },
    {
        id: '2',
        title: 'Reverse String',
        difficulty: 'EASY',
        category: 'Strings',
        tags: ['Two Pointers', 'String'],
        description: 'Write a function that reverses a string.',
        examples: [
            { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }
        ],
        starterCode: {
            javascript: 'function reverseString(s) {\n  // your code\n}',
            python: 'class Solution:\n    def reverseString(self, s: List[str]) -> None:\n        pass'
        },
        testCases: [
            { input: 'h e l l o', expected: 'o l l e h', hidden: false }
        ]
    },
    {
        id: '3',
        title: 'Valid Parentheses',
        difficulty: 'EASY',
        category: 'Stack',
        tags: ['Stack', 'String'],
        description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets, and open brackets are closed in the correct order.',
        examples: [
            { input: 's = "()"', output: 'true' },
            { input: 's = "()[]{}"', output: 'true' },
            { input: 's = "(]"', output: 'false', explanation: 'Mismatched bracket types.' }
        ],
        starterCode: {
            javascript: 'function isValid(s) {\n  // your code\n}',
            typescript: 'function isValid(s: string): boolean {\n  // your code\n  return false;\n}',
            python: 'class Solution:\n    def isValid(self, s: str) -> bool:\n        pass'
        },
        testCases: [
            { input: '()', expected: 'true', hidden: false },
            { input: '()[]{}\n', expected: 'true', hidden: false },
            { input: '(]', expected: 'false', hidden: false },
            { input: '([)]', expected: 'false', hidden: true }
        ]
    },
    {
        id: '4',
        title: 'Maximum Subarray',
        difficulty: 'MEDIUM',
        category: 'Dynamic Programming',
        tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
        description: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
        examples: [
            { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
            { input: 'nums = [1]', output: '1' }
        ],
        starterCode: {
            javascript: 'function maxSubArray(nums) {\n  // your code\n}',
            typescript: 'function maxSubArray(nums: number[]): number {\n  // your code\n  return 0;\n}',
            python: 'class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        pass'
        },
        testCases: [
            { input: '-2 1 -3 4 -1 2 1 -5 4', expected: '6', hidden: false },
            { input: '1', expected: '1', hidden: false },
            { input: '5 4 -1 7 8', expected: '23', hidden: true }
        ]
    },
    {
        id: '5',
        title: 'Merge Two Sorted Lists',
        difficulty: 'EASY',
        category: 'Linked List',
        tags: ['Linked List', 'Recursion'],
        description: 'You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list. Return the head of the merged linked list.',
        examples: [
            { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
            { input: 'list1 = [], list2 = []', output: '[]' }
        ],
        starterCode: {
            javascript: 'function mergeTwoLists(list1, list2) {\n  // your code\n}',
            python: 'class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        pass'
        },
        testCases: [
            { input: '1 2 4\n1 3 4', expected: '1 1 2 3 4 4', hidden: false }
        ]
    },
    {
        id: '6',
        title: 'Binary Search',
        difficulty: 'EASY',
        category: 'Binary Search',
        tags: ['Array', 'Binary Search'],
        description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return `-1`.',
        examples: [
            { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists at index 4.' },
            { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' }
        ],
        starterCode: {
            javascript: 'function search(nums, target) {\n  // your code\n}',
            typescript: 'function search(nums: number[], target: number): number {\n  // your code\n  return -1;\n}',
            python: 'class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        pass'
        },
        testCases: [
            { input: '-1 0 3 5 9 12\n9', expected: '4', hidden: false },
            { input: '-1 0 3 5 9 12\n2', expected: '-1', hidden: false }
        ]
    },
    {
        id: '7',
        title: 'Product of Array Except Self',
        difficulty: 'MEDIUM',
        category: 'Arrays',
        tags: ['Array', 'Prefix Sum'],
        description: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. You must write an algorithm that runs in O(n) time and without using the division operation.',
        examples: [
            { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
            { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' }
        ],
        starterCode: {
            javascript: 'function productExceptSelf(nums) {\n  // your code\n}',
            python: 'class Solution:\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        pass'
        },
        testCases: [
            { input: '1 2 3 4', expected: '24 12 8 6', hidden: false },
            { input: '-1 1 0 -3 3', expected: '0 0 9 0 0', hidden: true }
        ]
    },
    {
        id: '8',
        title: 'Word Break',
        difficulty: 'MEDIUM',
        category: 'Dynamic Programming',
        tags: ['Hash Table', 'String', 'Dynamic Programming', 'Trie', 'Memoization'],
        description: 'Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.',
        examples: [
            { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true', explanation: 'Return true because "leetcode" can be segmented as "leet code".' },
            { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: 'true' },
            { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: 'false' }
        ],
        starterCode: {
            javascript: 'function wordBreak(s, wordDict) {\n  // your code\n}',
            python: 'class Solution:\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n        pass'
        },
        testCases: [
            { input: 'leetcode\nleet code', expected: 'true', hidden: false },
            { input: 'catsandog\ncats dog sand and cat', expected: 'false', hidden: true }
        ]
    },
    {
        id: '9',
        title: 'LRU Cache',
        difficulty: 'MEDIUM',
        category: 'Design',
        tags: ['Hash Table', 'Linked List', 'Design', 'Doubly-Linked List'],
        description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the `LRUCache` class with `get(key)` (return value or -1) and `put(key, value)` methods. Both must run in O(1) average time complexity.',
        examples: [
            { input: 'LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2), put(4,4), get(1), get(3), get(4)', output: '[null,null,null,1,null,-1,null,-1,3,4]' }
        ],
        starterCode: {
            javascript: 'class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    // your code\n  }\n  get(key) {\n    // your code\n  }\n  put(key, value) {\n    // your code\n  }\n}',
            python: 'class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n    def get(self, key: int) -> int:\n        pass\n    def put(self, key: int, value: int) -> None:\n        pass'
        },
        testCases: [
            { input: '2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2', expected: '1\n-1', hidden: false }
        ]
    },
    {
        id: '10',
        title: 'Climbing Stairs',
        difficulty: 'EASY',
        category: 'Dynamic Programming',
        tags: ['Math', 'Dynamic Programming', 'Memoization'],
        description: 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?',
        examples: [
            { input: 'n = 2', output: '2', explanation: 'There are two ways: 1+1 and 2.' },
            { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, 2+1.' }
        ],
        starterCode: {
            javascript: 'function climbStairs(n) {\n  // your code\n}',
            typescript: 'function climbStairs(n: number): number {\n  // your code\n  return 0;\n}',
            python: 'class Solution:\n    def climbStairs(self, n: int) -> int:\n        pass'
        },
        testCases: [
            { input: '2', expected: '2', hidden: false },
            { input: '3', expected: '3', hidden: false },
            { input: '5', expected: '8', hidden: true }
        ]
    }
]
