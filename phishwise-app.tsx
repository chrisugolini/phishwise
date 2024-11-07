'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, ChevronRight, Lock, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

interface Scenario {
  id: number
  title: string
  content: string
  questions: Question[]
}

interface ContentPage {
  id: number
  title: string
  content: string
}

interface Module {
  id: number
  title: string
  description: string
  completed: boolean
  score: number | null
  pages: ContentPage[]
  scenarios: Scenario[]
  questions: Question[]
}

export default function PhishWiseApp() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState('landing')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [currentModule, setCurrentModule] = useState<Module | null>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [moduleStep, setModuleStep] = useState<'guide' | 'simulation' | 'quiz'>('guide')
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [modules, setModules] = useState<Module[]>([
    { 
      id: 1, 
      title: "Introduction to Phishing", 
      description: "Learn the basics of phishing attacks", 
      completed: false, 
      score: null,
      pages: [
        {
          id: 1,
          title: "Understanding Phishing Attacks",
          content: `
            <h2>Understanding Phishing Attacks</h2>
            <p>Phishing is a cybercrime in which a target or targets are contacted by email, telephone or text message by someone posing as a legitimate institution to lure individuals into providing sensitive data such as personally identifiable information, banking and credit card details, and passwords.</p>
            <p>Phishing attacks are a form of social engineering where attackers deceive people into revealing sensitive information or installing malicious software. These attacks often rely on creating a sense of urgency or fear in the victim, prompting them to act quickly without thinking critically.</p>
            <h3>Key characteristics of phishing attacks include:</h3>
            <ul>
              <li>Impersonation of trusted entities (e.g., banks, social media platforms, government agencies)</li>
              <li>Use of urgent or threatening language to provoke immediate action</li>
              <li>Requests for sensitive information or credentials</li>
              <li>Presence of suspicious links or attachments</li>
            </ul>
          `
        },
        {
          id: 2,
          title: "Types of Phishing Attacks",
          content: `
            <h2>Types of Phishing Attacks</h2>
            <p>Phishing attacks come in various forms, each with its own characteristics and targets:</p>
            <ol>
              <li><strong>Email Phishing:</strong> The most common type, where attackers send fraudulent emails mimicking legitimate organizations.</li>
              <li><strong>Spear Phishing:</strong> Targeted attacks against specific individuals or organizations, often using personalized information.</li>
              <li><strong>Whaling:</strong> A form of spear phishing targeting high-profile individuals like C-level executives.</li>
              <li><strong>Smishing:</strong> Phishing conducted via SMS text messages.</li>
              <li><strong>Vishing:</strong> Voice phishing, where attackers use phone calls to deceive victims.</li>
              <li><strong>Clone Phishing:</strong> Attackers create a nearly identical copy of a legitimate email with malicious content.</li>
            </ol>
            <p>Understanding these different types of phishing attacks is crucial for developing a comprehensive defense strategy. Each type requires specific awareness and prevention techniques.</p>
          `
        },
        {
          id: 3,
          title: "Recognizing Phishing Attempts",
          content: `
            <h2>Recognizing Phishing Attempts</h2>
            <p>Being able to identify potential phishing attempts is crucial for protecting yourself and your organization. Here are some key indicators to watch out for:</p>
            <ul>
              <li><strong>Suspicious Sender Address:</strong> Check if the email address matches the supposed sender's organization.</li>
              <li><strong>Generic Greetings:</strong> Phishers often use generic greetings like "Dear Sir/Madam" instead of your name.</li>
              <li><strong>Urgency or Threats:</strong> Be wary of messages creating a sense of urgency or threatening negative consequences.</li>
              <li><strong>Unexpected Attachments:</strong> Be cautious of attachments, especially executable files (.exe, .scr, etc.).</li>
              <li><strong>Suspicious Links:</strong> Hover over links to see the actual URL before clicking. Look for slight misspellings or unexpected domains.</li>
              <li><strong>Requests for Sensitive Information:</strong> Legitimate organizations typically don't ask for sensitive data via email.</li>
              <li><strong>Poor Grammar or Spelling:</strong> While not always indicative, many phishing emails contain obvious errors.</li>
            </ul>
            <p>Remember, if something seems too good to be true or unusually urgent, it's often a sign of a potential phishing attempt. When in doubt, verify through official channels before taking any action.</p>
          `
        }
      ],
      scenarios: [
        {
          id: 1,
          title: "Suspicious Email",
          content: `
            <h3>Scenario 1: Suspicious Email</h3>
            <p>You've received the following email:</p>
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
              <p><strong>From:</strong> security@yourbank.com</p>
              <p><strong>Subject:</strong> Urgent: Account Security Update Required</p>
              <p>Dear Valued Customer,</p>
              <p>We have detected unusual activity on your account. To secure your account, please click the link below and verify your information immediately:</p>
              <p><a href="#">http://secure-yourbank.com-update.net/login</a></p>
              <p>Failure to do so may result in your account being suspended.</p>
              <p>Thank you for your prompt attention to this matter.</p>
              <p>YourBank Security Team</p>
            </div>
          `,
          questions: [
            {
              id: 1,
              text: "What is the main red flag in this email?",
              options: [
                "The sender's email address",
                "The urgent tone of the message",
                "The URL of the link",
                "The threat of account suspension"
              ],
              correctAnswer: 2
            },
            {
              id: 2,
              text: "What should you do in response to this email?",
              options: [
                "Click the link and update your information",
                "Reply to the email asking for more details",
                "Forward the email to your friends as a warning",
                "Contact your bank through their official website or phone number"
              ],
              correctAnswer: 3
            },
            {
              id: 3,
              text: "Why is the URL in this email suspicious?",
              options: [
                "It uses 'http' instead of 'https'",
                "It contains a hyphen in the domain name",
                "It includes 'update' in the URL",
                "All of the above"
              ],
              correctAnswer: 3
            }
          ]
        },
        {
          id: 2,
          title: "Social Media Message",
          content: `
            <h3>Scenario 2: Social Media Message</h3>
            <p>You receive the following direct message on a social media platform:</p>
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
              <p><strong>From:</strong> Celebrity_Fan_Page</p>
              <p>Hey there! As a loyal follower, you've been selected to win a meet-and-greet with your favorite celebrity!</p>
              <p>To claim your prize, just click this link and enter your details:</p>
              <p><a href="#">http://celebrity-meetup.com/claim-prize</a></p>
              <p>Hurry, this offer expires in 24 hours!</p>
            </div>
          `,
          questions: [
            {
              id: 1,
              text: "What are some red flags in this social media message?",
              options: [
                "The urgency of the offer",
                "The request to click a link",
                "The promise of a too-good-to-be-true prize",
                "All of the above"
              ],
              correctAnswer: 3
            },
            {
              id: 2,
              text: "Why are social media platforms attractive to phishers?",
              options: [
                "Users tend to share a lot of personal information",
                "It's easy to create fake profiles",
                "People are more likely to trust messages from 'friends'",
                "All of the above"
              ],
              correctAnswer: 3
            },
            {
              id: 3,
              text: "What should you do if you receive a suspicious message like this?",
              options: [
                "Click the link to see if it's legitimate",
                "Share the offer with your friends",
                "Ignore and report the message",
                "Reply asking for more information"
              ],
              correctAnswer: 2
            }
          ]
        }
      ],
      questions: [
        {
          id: 1,
          text: "What is the main goal of a phishing attack?",
          options: [
            "To install software updates",
            "To steal sensitive information",
            "To improve network security",
            "To send spam emails"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "Which of the following is NOT a common characteristic of phishing attempts?",
          options: [
            "Urgent or threatening language",
            "Requests for personal information",
            "Suspicious attachments or links",
            "Personalized greetings with your full name and account details"
          ],
          correctAnswer: 3
        },
        {
          id: 3,
          text: "What should you do if you receive a suspicious email asking you to update your account information?",
          options: [
            "Click the link and update your information immediately",
            "Reply to the email asking for more information",
            "Forward the email to your friends to warn them",
            "Contact the company directly using a known, official channel"
          ],
          correctAnswer: 3
        },
        {
          id: 4,
          text: "Which of the following is a safe way to verify the legitimacy of a request for personal information?",
          options: [
            "Check if the email uses official logos",
            "Call the company using a number from their official website",
            "Reply to the email and ask if it's legitimate",
            "Check if the email address looks official"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          text: "What is 'spear phishing'?",
          options: [
            "Phishing attacks targeting specific individuals or organizations",
            "Phishing through SMS messages",
            "Phishing through smartphone apps",
            "Phishing through email attachments"
          ],
          correctAnswer: 0
        },
        {
          id: 6,
          text: "Which of the following is NOT a best practice for preventing phishing attacks?",
          options: [
            "Using multi-factor authentication",
            "Clicking on links to verify their authenticity",
            "Keeping software and systems up-to-date",
            "Being skeptical of unsolicited messages"
          ],
          correctAnswer: 1
        },
        {
          id: 7,
          text: "What technique do phishers often use to create a sense of urgency?",
          options: [
            "Offering large sums of money",
            "Threatening account suspension or legal action",
            "Using colorful and attractive email designs",
            "Sending multiple follow-up emails"
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          text: "Which type of phishing attack is most likely to target high-level executives?",
          options: [
            "Vishing",
            "Smishing",
            "Whaling",
            "Clone phishing"
          ],
          correctAnswer: 2
        },
        {
          id: 9,
          text: "What is a 'phishing kit'?",
          options: [
            "A set of anti-phishing tools",
            "A package of software tools used by phishers to set up attacks",
            "A training program for identifying phishing attempts",
            "A collection of known phishing emails"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          text: "Which of the following is the most secure way to access a website?",
          options: [
            "Clicking a link in an email",
            "Typing the URL directly into your browser",
            "Searching for the website on a search engine",
            "Using a bookmark you've previously saved"
          ],
          correctAnswer: 1
        }
      ]
    },
    { 
      id: 2, 
      title: "Email Security Best Practices", 
      description: "Learn how to secure your email communications", 
      completed: false, 
      score: null,
      pages: [
        {
          id: 1,
          title: "Email Security Fundamentals",
          content: `
            <h2>Email Security Fundamentals</h2>
            <p>Email security is crucial in today's digital landscape. Here are some fundamental concepts:</p>
            <ul>
              <li><strong>Encryption:</strong> Protecting the content of your emails from unauthorized access.</li>
              <li><strong>Authentication:</strong> Verifying the identity of email senders and recipients.</li>
              <li><strong>Access Control:</strong> Managing who can access your email account and what they can do.</li>
              <li><strong>Threat Detection:</strong> Identifying and mitigating potential security risks in emails.</li>
            </ul>
            <p>Understanding these fundamentals is the first step in securing your email communications. Let's explore each of these concepts in more detail:</p>
            <h3>Encryption</h3>
            <p>Email encryption involves encoding the content of your emails so that only the intended recipient can read them. There are two main types of email encryption:</p>
            <ul>
              <li><strong>Transport Layer Security (TLS):</strong> Encrypts emails in transit between email servers.</li>
              <li><strong>End-to-End Encryption:</strong> Encrypts the email content from the sender's device to the recipient's device.</li>
            </ul>
            <h3>Authentication</h3>
            <p>Email authentication helps verify that an email actually comes from the sender it claims to be from. Common authentication protocols include:</p>
            <ul>
              <li><strong>SPF (Sender Policy Framework):</strong> Verifies that the sending mail server is authorized to send emails for a specific domain.</li>
              <li><strong>DKIM (DomainKeys Identified Mail):</strong> Adds a digital signature to emails, allowing the recipient to verify that the email hasn't been tampered with in transit.</li>
              <li><strong>DMARC (Domain-based Message Authentication, Reporting, and Conformance):</strong> Builds on SPF and DKIM to provide instructions on how to handle emails that fail authentication checks.</li>
            </ul>
          `
        },
        {
          id: 2,
          title: "Strong Password Practices",
          content: `
            <h2>Strong Password Practices</h2>
            <p>Creating and maintaining strong passwords is essential for email security:</p>
            <ol>
              <li>Use a combination of uppercase and lowercase letters, numbers, and symbols.</li>
              <li>Make your password at least 12 characters long.</li>
              <li>Avoid using personal information or common words.</li>
              <li>Use a unique password for each of your accounts.</li>
              <li>Consider using a password manager to generate and store complex passwords.</li>
            </ol>
            <h3>Password Do's and Don'ts</h3>
            <p>Here are some additional tips for creating and managing strong passwords:</p>
            <h4>Do:</h4>
            <ul>
              <li>Use a passphrase: A long phrase that's easy for you to remember but hard for others to guess.</li>
              <li>Enable two-factor authentication whenever possible.</li>
              <li>Change your passwords regularly, especially if you suspect a breach.</li>
              <li>Use different passwords for work and personal accounts.</li>
            </ul>
            <h4>Don't:</h4>
            <ul>
              <li>Use easily guessable information like birthdays, names, or common words.</li>
              <li>Share your passwords with others, even if they claim to be from IT support.</li>
              <li>Write down passwords and leave them in visible places.</li>
              <li>Use the same password across multiple accounts.</li>
            </ul>
            <h3>Password Managers</h3>
            <p>Password managers are tools that can generate, store, and auto-fill complex passwords for you. They offer several benefits:</p>
            <ul>
              <li>You only need to remember one master password.</li>
              <li>They can generate strong, unique passwords for each of your accounts.</li>
              <li>Many offer secure sharing features for team environments.</li>
              <li>Some can alert you if any of your passwords have been compromised in a data breach.</li>
            </ul>
            <p>While no security measure is perfect, using a reputable password manager can significantly enhance your overall password security.</p>
          `
        },
        {
          id: 3,
          title: "Safe Email Practices",
          content: `
            <h2>Safe Email Practices</h2>
            <p>Adopt these practices to enhance your email security:</p>
            <ol>
              <li>Be cautious about opening attachments or clicking links from unknown senders.</li>
              <li>Avoid accessing your email on public Wi-Fi networks without using a VPN.</li>
              <li>Regularly update your email client and operating system.</li>
              <li>Use anti-virus and anti-malware software and keep it updated.</li>
              <li>Be wary of requests for sensitive information via email.</li>
              <li>Log out of your email account when using shared or public computers.</li>
              <li>Regularly review your account's login activity and security settings.</li>
            </ol>
            <h3>Handling Suspicious Emails</h3>
            <p>If you receive a suspicious email, follow these steps:</p>
            <ol>
              <li>Don't click on any links or download any attachments.</li>
              <li>Check the sender's email address carefully.</li>
              <li>Look for poor grammar or spelling errors.</li>
              <li>Be wary of urgent or threatening language.</li>
              <li>If in doubt, contact the supposed sender through a known, trusted channel.</li>
              <li>Report suspicious emails to your IT department or email provider.</li>
            </ol>
            <h3>Email Encryption Tools</h3>
            <p>For sensitive communications, consider using email encryption tools:</p>
            <ul>
              <li><strong>PGP (Pretty Good Privacy):</strong> A popular method for end-to-end email encryption.</li>
              <li><strong>S/MIME (Secure/Multipurpose Internet Mail Extensions):</strong> Another standard for end-to-end email encryption, often built into email clients.</li>
              <li><strong>ProtonMail:</strong> A secure email service that offers end-to-end encryption.</li>
              <li><strong>Virtru:</strong> A data protection platform that includes email encryption features.</li>
            </ul>
            <p>Remember, the security of your email is only as strong as your weakest practice. Consistently applying these safe email practices can significantly reduce your risk of falling victim to email-based attacks.</p>
          `
        }
      ],
      scenarios: [
        {
          id: 1,
          title: "Suspicious Attachment",
          content: `
            <h3>Scenario 1: Suspicious Attachment</h3>
            <p>You receive the following email:</p>
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
              <p><strong>From:</strong> unknown_sender@example.com</p>
              <p><strong>Subject:</strong> Important Document - Please Review</p>
              <p>Dear Sir/Madam,</p>
              <p>Please find attached an important document for your immediate review. It is crucial that you open this attachment as soon as possible.</p>
              <p>Best regards,</p>
              <p>Unknown Sender</p>
              <p><strong>Attachment:</strong> important_document.exe</p>
            </div>
          `,
          questions: [
            {
              id: 1,
              text: "What is the main red flag in this email?",
              options: [
                "The sender's email address",
                "The urgent tone of the message",
                "The file extension of the attachment",
                "The generic greeting"
              ],
              correctAnswer: 2
            },
            {
              id: 2,
              text: "What should you do with this email?",
              options: [
                "Open the attachment to see what it contains",
                "Reply to ask for more information",
                "Forward it to your IT department",
                "Delete the email without opening the attachment"
              ],
              correctAnswer: 2
            },
            {
              id: 3,
              text: "Why are .exe files particularly dangerous as email attachments?",
              options: [
                "They are always too large to send via email",
                "They can contain and execute malicious code",
                "They are incompatible with most email clients",
                "They often corrupt during transmission"
              ],
              correctAnswer: 1
            }
          ]
        },
        {
          id: 2,
          title: "Password Reset Request",
          content: `
            <h3>Scenario 2: Password Reset Request</h3>
            <p>You receive the following email:</p>
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
              <p><strong>From:</strong> security@yourmail-service.com</p>
              <p><strong>Subject:</strong> Urgent: Password Reset Required</p>
              <p>Dear User,</p>
              <p>We have detected unusual activity on your account. For your security, please reset your password immediately by clicking the link below:</p>
              <p><a href="#">http://yourmail-service.password-reset.net/login</a></p>
              <p>If you do not reset your password within 24 hours, your account will be locked.</p>
              <p>Thank you for your cooperation.</p>
              <p>YourMail Security Team</p>
            </div>
          `,
          questions: [
            {
              id: 1,
              text: "What should you do in response to this email?",
              options: [
                "Click the link and reset your password immediately",
                "Ignore the email as it's likely a phishing attempt",
                "Forward the email to your contacts to warn them",
                "Reply to the email asking for more information"
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              text: "How can you safely check if your account really needs a password reset?",
              options: [
                "Call the email service's customer support",
                "Click the link in the email to see if it's legitimate",
                "Log in to your account directly through the official website or app",
                "Wait for 24 hours to see if your account gets locked"
              ],
              correctAnswer: 2
            },
            {
              id: 3,
              text: "Why do phishers often use urgency in their messages?",
              options: [
                "To make the email seem more important",
                "To pressure users into acting without thinking",
                "To comply with email sending regulations",
                "To ensure their emails don't get caught in spam filters"
              ],
              correctAnswer: 1
            }
          ]
        }
      ],
      questions: [
        {
          id: 1,
          text: "What is the purpose of two-factor authentication?",
          options: [
            "To make logging in more complicated",
            "To add an extra layer of security beyond just a password",
            "To speed up the login process",
            "To share your login information with a trusted contact"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "Which of the following is NOT a recommended password practice?",
          options: [
            "Using a combination of uppercase and lowercase letters",
            "Including numbers and symbols",
            "Making the password at least 12 characters long",
            "Using the same password for multiple accounts for consistency"
          ],
          correctAnswer: 3
        },
        {
          id: 3,
          text: "What does email encryption protect?",
          options: [
            "The sender's identity",
            "The content of the email",
            "The email's send date",
            "The email's subject line"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          text: "Which of the following file types is most likely to contain malware?",
          options: [
            ".txt",
            ".jpg",
            ".exe",
            ".pdf"
          ],
          correctAnswer: 2
        },
        {
          id: 5,
          text: "What is a safe way to check the authenticity of an email requesting account changes?",
          options: [
            "Reply to the email to confirm",
            "Click any links in the email to verify",
            "Call the company using a number from their official website",
            "Forward the email to a friend for a second opinion"
          ],
          correctAnswer: 2
        },
        {
          id: 6,
          text: "What does TLS (Transport Layer Security) do?",
          options: [
            "Encrypts emails in transit between email servers",
            "Scans emails for viruses",
            "Filters out spam emails",
            "Verifies the sender's identity"
          ],
          correctAnswer: 0
        },
        {
          id: 7,
          text: "Why is it important to log out of your email account on shared computers?",
          options: [
            "To save energy",
            "To free up memory on the computer",
            "To prevent unauthorized access to your account",
            "To ensure faster login next time"
          ],
          correctAnswer: 2
        },
        {
          id: 8,
          text: "Which of the following is NOT a common email authentication protocol?",
          options: [
            "SPF (Sender Policy Framework)",
            "DKIM (DomainKeys Identified Mail)",
            "DMARC (Domain-based Message Authentication, Reporting, and Conformance)",
            "SMTP (Simple Mail Transfer Protocol)"
          ],
          correctAnswer: 3
        },
        {
          id: 9,
          text: "What is the main advantage of using a password manager?",
          options: [
            "It makes all your passwords the same for easy remembering",
            "It generates and stores complex, unique passwords for each account",
            "It shares your passwords with trusted contacts",
            "It eliminates the need for passwords altogether"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          text: "Which of the following is the best practice for creating a strong passphrase?",
          options: [
            "Using a common phrase from a book or movie",
            "Combining unrelated words with numbers and symbols",
            "Using your favorite quote",
            "Repeating a word multiple times"
          ],
          correctAnswer: 1
        }
      ]
    },
    { 
      id: 3, 
      title: "Social Engineering Awareness", 
      description: "Understand and defend against social engineering tactics", 
      completed: false, 
      score: null,
      pages: [
        {
          id: 1,
          title: "Introduction to Social Engineering",
          content: `
            <h2>Introduction to Social Engineering</h2>
            <p>Social engineering is the art of manipulating people into giving up confidential information or performing actions that compromise security. Unlike technical hacking, social engineering relies on human interaction and often involves tricking people into breaking normal security procedures.</p>
            <p>Key aspects of social engineering include:</p>
            <ul>
              <li>Exploiting human psychology rather than technical vulnerabilities</li>
              <li>Using persuasion, influence, and manipulation techniques</li>
              <li>Targeting individuals or organizations to gain unauthorized access or information</li>
              <li>Often being the first step in a larger attack strategy</li>
            </ul>
            <h3>Why Social Engineering is Effective</h3>
            <p>Social engineering attacks are often successful because they exploit fundamental human tendencies and behaviors:</p>
            <ul>
              <li><strong>Trust:</strong> People are generally inclined to trust others, especially those who appear to be in positions of authority.</li>
              <li><strong>Fear:</strong> Threats or warnings can manipulate people into hasty actions.</li>
              <li><strong>Curiosity:</strong> People are naturally curious and may be tempted to click on intriguing links or open suspicious attachments.</li>
              <li><strong>Desire to Help:</strong> Many people have a natural inclination to be helpful, which attackers can exploit.</li>
              <li><strong>Lack of Awareness:</strong> Many individuals are simply unaware of the tactics used by social engineers.</li>
            </ul>
            <p>Understanding these psychological factors is crucial in developing effective defenses against social engineering attacks.</p>
          `
        },
        {
          id: 2,
          title: "Common Social Engineering Techniques",
          content: `
            <h2>Common Social Engineering Techniques</h2>
            <p>Social engineers use various techniques to manipulate their targets:</p>
            <ol>
              <li><strong>Phishing:</strong> Sending fraudulent emails or messages to trick recipients into revealing sensitive information.</li>
              <li><strong>Pretexting:</strong> Creating a fabricated scenario to extract information from a target.</li>
              <li><strong>Baiting:</strong> Offering something enticing to an end user in exchange for private data.</li>
              <li><strong>Tailgating:</strong> Following an authorized person into a restricted area.</li>
              <li><strong>Quid Pro Quo:</strong> Requesting private information in exchange for a service.</li>I'll modify the PhishWise application to include 10 questions for each module quiz and extend the educational guides to about 3 pages per module. I'll update the code accordingly.

<Thinking>



Referencing my internal reminder:
1. I must write COMPLETE CODE without placeholders.
2. I need to include all necessary components and content.
3. I should implement the requested changes fully.
4. I must ensure the code can be copied directly into a Next.js application and work in the preview tab.
5. I must use the correct syntax for the React Component code block.
6. I should maintain the existing functionality while adding the new features.



</Thinking>

Here's the updated PhishWise application with the requested changes:

```tsx project="PhishWise" file="phishwise-app.tsx" type="react"
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, ChevronRight, Lock, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

interface Scenario {
  id: number
  title: string
  content: string
  questions: Question[]
}

interface ContentPage {
  id: number
  title: string
  content: string
}

interface Module {
  id: number
  title: string
  description: string
  completed: boolean
  score: number | null
  pages: ContentPage[]
  scenarios: Scenario[]
  questions: Question[]
}

export default function PhishWiseApp() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState('landing')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [currentModule, setCurrentModule] = useState<Module | null>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [moduleStep, setModuleStep] = useState<'guide' | 'simulation' | 'quiz'>('guide')
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [modules, setModules] = useState<Module[]>([
    { 
      id: 1, 
      title: "Introduction to Phishing", 
      description: "Learn the basics of phishing attacks", 
      completed: false, 
      score: null,
      pages: [
        {
          id: 1,
          title: "Understanding Phishing Attacks",
          content: `
            <h2>Understanding Phishing Attacks</h2>
            <p>Phishing is a cybercrime in which a target or targets are contacted by email, telephone or text message by someone posing as a legitimate institution to lure individuals into providing sensitive data such as personally identifiable information, banking and credit card details, and passwords.</p>
            <p>Phishing attacks are a form of social engineering where attackers deceive people into revealing sensitive information or installing malicious software. These attacks often rely on creating a sense of urgency or fear in the victim, prompting them to act quickly without thinking critically.</p>
            <h3>Key characteristics of phishing attacks include:</h3>
            <ul>
              <li>Impersonation of trusted entities (e.g., banks, social media platforms, government agencies)</li>
              <li>Use of urgent or threatening language to provoke immediate action</li>
              <li>Requests for sensitive information or credentials</li>
              <li>Presence of suspicious links or attachments</li>
            </ul>
          `
        },
        {
          id: 2,
          title: "Types of Phishing Attacks",
          content: `
            <h2>Types of Phishing Attacks</h2>
            <p>Phishing attacks come in various forms, each with its own characteristics and targets:</p>
            <ol>
              <li><strong>Email Phishing:</strong> The most common type, where attackers send fraudulent emails mimicking legitimate organizations.</li>
              <li><strong>Spear Phishing:</strong> Targeted attacks against specific individuals or organizations, often using personalized information.</li>
              <li><strong>Whaling:</strong> A form of spear phishing targeting high-profile individuals like C-level executives.</li>
              <li><strong>Smishing:</strong> Phishing conducted via SMS text messages.</li>
              <li><strong>Vishing:</strong> Voice phishing, where attackers use phone calls to deceive victims.</li>
              <li><strong>Clone Phishing:</strong> Attackers create a nearly identical copy of a legitimate email with malicious content.</li>
            </ol>
            <p>Understanding these different types of phishing attacks is crucial for developing a comprehensive defense strategy. Each type requires specific awareness and prevention techniques.</p>
          `
        },
        {
          id: 3,
          title: "Recognizing Phishing Attempts",
          content: `
            <h2>Recognizing Phishing Attempts</h2>
            <p>Being able to identify potential phishing attempts is crucial for protecting yourself and your organization. Here are some key indicators to watch out for:</p>
            <ul>
              <li><strong>Suspicious Sender Address:</strong> Check if the email address matches the supposed sender's organization.</li>
              <li><strong>Generic Greetings:</strong> Phishers often use generic greetings like "Dear Sir/Madam" instead of your name.</li>
              <li><strong>Urgency or Threats:</strong> Be wary of messages creating a sense of urgency or threatening negative consequences.</li>
              <li><strong>Unexpected Attachments:</strong> Be cautious of attachments, especially executable files (.exe, .scr, etc.).</li>
              <li><strong>Suspicious Links:</strong> Hover over links to see the actual URL before clicking. Look for slight misspellings or unexpected domains.</li>
              <li><strong>Requests for Sensitive Information:</strong> Legitimate organizations typically don't ask for sensitive data via email.</li>
              <li><strong>Poor Grammar or Spelling:</strong> While not always indicative, many phishing emails contain obvious errors.</li>
            </ul>
            <p>Remember, if something seems too good to be true or unusually urgent, it's often a sign of a potential phishing attempt. When in doubt, verify through official channels before taking any action.</p>
          `
        }
      ],
      scenarios: [
        {
          id: 1,
          title: "Suspicious Email",
          content: `
            <h3>Scenario 1: Suspicious Email</h3>
            <p>You've received the following email:</p>
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
              <p><strong>From:</strong> security@yourbank.com</p>
              <p><strong>Subject:</strong> Urgent: Account Security Update Required</p>
              <p>Dear Valued Customer,</p>
              <p>We have detected unusual activity on your account. To secure your account, please click the link below and verify your information immediately:</p>
              <p><a href="#">http://secure-yourbank.com-update.net/login</a></p>
              <p>Failure to do so may result in your account being suspended.</p>
              <p>Thank you for your prompt attention to this matter.</p>
              <p>YourBank Security Team</p>
            </div>
          `,
          questions: [
            {
              id: 1,
              text: "What is the main red flag in this email?",
              options: [
                "The sender's email address",
                "The urgent tone of the message",
                "The URL of the link",
                "The threat of account suspension"
              ],
              correctAnswer: 2
            },
            {
              id: 2,
              text: "What should you do in response to this email?",
              options: [
                "Click the link and update your information",
                "Reply to the email asking for more details",
                "Forward the email to your friends as a warning",
                "Contact your bank through their official website or phone number"
              ],
              correctAnswer: 3
            },
            {
              id: 3,
              text: "Why is the URL in this email suspicious?",
              options: [
                "It uses 'http' instead of 'https'",
                "It contains a hyphen in the domain name",
                "It includes 'update' in the URL",
                "All of the above"
              ],
              correctAnswer: 3
            }
          ]
        },
        {
          id: 2,
          title: "Social Media Message",
          content: `
            <h3>Scenario 2: Social Media Message</h3>
            <p>You receive the following direct message on a social media platform:</p>
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
              <p><strong>From:</strong> Celebrity_Fan_Page</p>
              <p>Hey there! As a loyal follower, you've been selected to win a meet-and-greet with your favorite celebrity!</p>
              <p>To claim your prize, just click this link and enter your details:</p>
              <p><a href="#">http://celebrity-meetup.com/claim-prize</a></p>
              <p>Hurry, this offer expires in 24 hours!</p>
            </div>
          `,
          questions: [
            {
              id: 1,
              text: "What are some red flags in this social media message?",
              options: [
                "The urgency of the offer",
                "The request to click a link",
                "The promise of a too-good-to-be-true prize",
                "All of the above"
              ],
              correctAnswer: 3
            },
            {
              id: 2,
              text: "Why are social media platforms attractive to phishers?",
              options: [
                "Users tend to share a lot of personal information",
                "It's easy to create fake profiles",
                "People are more likely to trust messages from 'friends'",
                "All of the above"
              ],
              correctAnswer: 3
            },
            {
              id: 3,
              text: "What should you do if you receive a suspicious message like this?",
              options: [
                "Click the link to see if it's legitimate",
                "Share the offer with your friends",
                "Ignore and report the message",
                "Reply asking for more information"
              ],
              correctAnswer: 2
            }
          ]
        }
      ],
      questions: [
        {
          id: 1,
          text: "What is the main goal of a phishing attack?",
          options: [
            "To install software updates",
            "To steal sensitive information",
            "To improve network security",
            "To send spam emails"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "Which of the following is NOT a common characteristic of phishing attempts?",
          options: [
            "Urgent or threatening language",
            "Requests for personal information",
            "Suspicious attachments or links",
            "Personalized greetings with your full name and account details"
          ],
          correctAnswer: 3
        },
        {
          id: 3,
          text: "What should you do if you receive a suspicious email asking you to update your account information?",
          options: [
            "Click the link and update your information immediately",
            "Reply to the email asking for more information",
            "Forward the email to your friends to warn them",
            "Contact the company directly using a known, official channel"
          ],
          correctAnswer: 3
        },
        {
          id: 4,
          text: "Which of the following is a safe way to verify the legitimacy of a request for personal information?",
          options: [
            "Check if the email uses official logos",
            "Call the company using a number from their official website",
            "Reply to the email and ask if it's legitimate",
            "Check if the email address looks official"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          text: "What is 'spear phishing'?",
          options: [
            "Phishing attacks targeting specific individuals or organizations",
            "Phishing through SMS messages",
            "Phishing through smartphone apps",
            "Phishing through email attachments"
          ],
          correctAnswer: 0
        },
        {
          id: 6,
          text: "Which of the following is NOT a best practice for preventing phishing attacks?",
          options: [
            "Using multi-factor authentication",
            "Clicking on links to verify their authenticity",
            "Keeping software and systems up-to-date",
            "Being skeptical of unsolicited messages"
          ],
          correctAnswer: 1
        },
        {
          id: 7,
          text: "What technique do phishers often use to create a sense of urgency?",
          options: [
            "Offering large sums of money",
            "Threatening account suspension or legal action",
            "Using colorful and attractive email designs",
            "Sending multiple follow-up emails"
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          text: "Which type of phishing attack is most likely to target high-level executives?",
          options: [
            "Vishing",
            "Smishing",
            "Whaling",
            "Clone phishing"
          ],
          correctAnswer: 2
        },
        {
          id: 9,
          text: "What is a 'phishing kit'?",
          options: [
            "A set of anti-phishing tools",
            "A package of software tools used by phishers to set up attacks",
            "A training program for identifying phishing attempts",
            "A collection of known phishing emails"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          text: "Which of the following is the most secure way to access a website?",
          options: [
            "Clicking a link in an email",
            "Typing the URL directly into your browser",
            "Searching for the website on a search engine",
            "Using a bookmark you've previously saved"
          ],
          correctAnswer: 1
        }
      ]
    },
    { 
      id: 2, 
      title: "Email Security Best Practices", 
      description: "Learn how to secure your email communications", 
      completed: false, 
      score: null,
      pages: [
        {
          id: 1,
          title: "Email Security Fundamentals",
          content: `
            <h2>Email Security Fundamentals</h2>
            <p>Email security is crucial in today's digital landscape. Here are some fundamental concepts:</p>
            <ul>
              <li><strong>Encryption:</strong> Protecting the content of your emails from unauthorized access.</li>
              <li><strong>Authentication:</strong> Verifying the identity of email senders and recipients.</li>
              <li><strong>Access Control:</strong> Managing who can access your email account and what they can do.</li>
              <li><strong>Threat Detection:</strong> Identifying and mitigating potential security risks in emails.</li>
            </ul>
            <p>Understanding these fundamentals is the first step in securing your email communications. Let's explore each of these concepts in more detail:</p>
            <h3>Encryption</h3>
            <p>Email encryption involves encoding the content of your emails so that only the intended recipient can read them. There are two main types of email encryption:</p>
            <ul>
              <li><strong>Transport Layer Security (TLS):</strong> Encrypts emails in transit between email servers.</li>
              <li><strong>End-to-End Encryption:</strong> Encrypts the email content from the sender's device to the recipient's device.</li>
            </ul>
            <h3>Authentication</h3>
            <p>Email authentication helps verify that an email actually comes from the sender it claims to be from. Common authentication protocols include:</p>
            <ul>
              <li><strong>SPF (Sender Policy Framework):</strong> Verifies that the sending mail server is authorized to send emails for a specific domain.</li>
              <li><strong>DKIM (DomainKeys Identified Mail):</strong> Adds a digital signature to emails, allowing the recipient to verify that the email hasn't been tampered with in transit.</li>
              <li><strong>DMARC (Domain-based Message Authentication, Reporting, and Conformance):</strong> Builds on SPF and DKIM to provide instructions on how to handle emails that fail authentication checks.</li>
            </ul>
          `
        },
        {
          id: 2,
          title: "Strong Password Practices",
          content: `
            <h2>Strong Password Practices</h2>
            <p>Creating and maintaining strong passwords is essential for email security:</p>
            <ol>
              <li>Use a combination of uppercase and lowercase letters, numbers, and symbols.</li>
              <li>Make your password at least 12 characters long.</li>
              <li>Avoid using personal information or common words.</li>
              <li>Use a unique password for each of your accounts.</li>
              <li>Consider using a password manager to generate and store complex passwords.</li>
            </ol>
            <h3>Password Do's and Don'ts</h3>
            <p>Here are some additional tips for creating and managing strong passwords:</p>
            <h4>Do:</h4>
            <ul>
              <li>Use a passphrase: A long phrase that's easy for you to remember but hard for others to guess.</li>
              <li>Enable two-factor authentication whenever possible.</li>
              <li>Change your passwords regularly, especially if you suspect a breach.</li>
              <li>Use different passwords for work and personal accounts.</li>
            </ul>
            <h4>Don't:</h4>
            <ul>
              <li>Use easily guessable information like birthdays, names, or common words.</li>
              <li>Share your passwords with others, even if they claim to be from IT support.</li>
              <li>Write down passwords and leave them in visible places.</li>
              <li>Use the same password across multiple accounts.</li>
            </ul>
            <h3>Password Managers</h3>
            <p>Password managers are tools that can generate, store, and auto-fill complex passwords for you. They offer several benefits:</p>
            <ul>
              <li>You only need to remember one master password.</li>
              <li>They can generate strong, unique passwords for each of your accounts.</li>
              <li>Many offer secure sharing features for team environments.</li>
              <li>Some can alert you if any of your passwords have been compromised in a data breach.</li>
            </ul>
            <p>While no security measure is perfect, using a reputable password manager can significantly enhance your overall password security.</p>
          `
        },
        {
          id: 3,
          title: "Safe Email Practices",
          content: `
            <h2>Safe Email Practices</h2>
            <p>Adopt these practices to enhance your email security:</p>
            <ol>
              <li>Be cautious about opening attachments or clicking links from unknown senders.</li>
              <li>Avoid accessing your email on public Wi-Fi networks without using a VPN.</li>
              <li>Regularly update your email client and operating system.</li>
              <li>Use anti-virus and anti-malware software and keep it updated.</li>
              <li>Be wary of requests for sensitive information via email.</li>
              <li>Log out of your email account when using shared or public computers.</li>
              <li>Regularly review your account's login activity and security settings.</li>
            </ol>
            <h3>Handling Suspicious Emails</h3>
            <p>If you receive a suspicious email, follow these steps:</p>
            <ol>
              <li>Don't click on any links or download any attachments.</li>
              <li>Check the sender's email address carefully.</li>
              <li>Look for poor grammar or spelling errors.</li>
              <li>Be wary of urgent or threatening language.</li>
              <li>If in doubt, contact the supposed sender through a known, trusted channel.</li>
              <li>Report suspicious emails to your IT department or email provider.</li>
            </ol>
            <h3>Email Encryption Tools</h3>
            <p>For sensitive communications, consider using email encryption tools:</p>
            <ul>
              <li><strong>PGP (Pretty Good Privacy):</strong> A popular method for end-to-end email encryption.</li>
              <li><strong>S/MIME (Secure/Multipurpose Internet Mail Extensions):</strong> Another standard for end-to-end email encryption, often built into email clients.</li>
              <li><strong>ProtonMail:</strong> A secure email service that offers end-to-end encryption.</li>
              <li><strong>Virtru:</strong> A data protection platform that includes email encryption features.</li>
            </ul>
            <p>Remember, the security of your email is only as strong as your weakest practice. Consistently applying these safe email practices can significantly reduce your risk of falling victim to email-based attacks.</p>
          `
        }
      ],
      scenarios: [
        {
          id: 1,
          title: "Suspicious Attachment",
          content: `
            <h3>Scenario 1: Suspicious Attachment</h3>
            <p>You receive the following email:</p>
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
              <p><strong>From:</strong> unknown_sender@example.com</p>
              <p><strong>Subject:</strong> Important Document - Please Review</p>
              <p>Dear Sir/Madam,</p>
              <p>Please find attached an important document for your immediate review. It is crucial that you open this attachment as soon as possible.</p>
              <p>Best regards,</p>
              <p>Unknown Sender</p>
              <p><strong>Attachment:</strong> important_document.exe</p>
            </div>
          `,
          questions: [
            {
              id: 1,
              text: "What is the main red flag in this email?",
              options: [
                "The sender's email address",
                "The urgent tone of the message",
                "The file extension of the attachment",
                "The generic greeting"
              ],
              correctAnswer: 2
            },
            {
              id: 2,
              text: "What should you do with this email?",
              options: [
                "Open the attachment to see what it contains",
                "Reply to ask for more information",
                "Forward it to your IT department",
                "Delete the email without opening the attachment"
              ],
              correctAnswer: 2
            },
            {
              id: 3,
              text: "Why are .exe files particularly dangerous as email attachments?",
              options: [
                "They are always too large to send via email",
                "They can contain and execute malicious code",
                "They are incompatible with most email clients",
                "They often corrupt during transmission"
              ],
              correctAnswer: 1
            }
          ]
        },
        {
          id: 2,
          title: "Password Reset Request",
          content: `
            <h3>Scenario 2: Password Reset Request</h3>
            <p>You receive the following email:</p>
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
              <p><strong>From:</strong> security@yourmail-service.com</p>
              <p><strong>Subject:</strong> Urgent: Password Reset Required</p>
              <p>Dear User,</p>
              <p>We have detected unusual activity on your account. For your security, please reset your password immediately by clicking the link below:</p>
              <p><a href="#">http://yourmail-service.password-reset.net/login</a></p>
              <p>If you do not reset your password within 24 hours, your account will be locked.</p>
              <p>Thank you for your cooperation.</p>
              <p>YourMail Security Team</p>
            </div>
          `,
          questions: [
            {
              id: 1,
              text: "What should you do in response to this email?",
              options: [
                "Click the link and reset your password immediately",
                "Ignore the email as it's likely a phishing attempt",
                "Forward the email to your contacts to warn them",
                "Reply to the email asking for more information"
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              text: "How can you safely check if your account really needs a password reset?",
              options: [
                "Call the email service's customer support",
                "Click the link in the email to see if it's legitimate",
                "Log in to your account directly through the official website or app",
                "Wait for 24 hours to see if your account gets locked"
              ],
              correctAnswer: 2
            },
            {
              id: 3,
              text: "Why do phishers often use urgency in their messages?",
              options: [
                "To make the email seem more important",
                "To pressure users into acting without thinking",
                "To comply with email sending regulations",
                "To ensure their emails don't get caught in spam filters"
              ],
              correctAnswer: 1
            }
          ]
        }
      ],
      questions: [
        {
          id: 1,
          text: "What is the purpose of two-factor authentication?",
          options: [
            "To make logging in more complicated",
            "To add an extra layer of security beyond just a password",
            "To speed up the login process",
            "To share your login information with a trusted contact"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "Which of the following is NOT a recommended password practice?",
          options: [
            "Using a combination of uppercase and lowercase letters",
            "Including numbers and symbols",
            "Making the password at least 12 characters long",
            "Using the same password for multiple accounts for consistency"
          ],
          correctAnswer: 3
        },
        {
          id: 3,
          text: "What does email encryption protect?",
          options: [
            "The sender's identity",
            "The content of the email",
            "The email's send date",
            "The email's subject line"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          text: "Which of the following file types is most likely to contain malware?",
          options: [
            ".txt",
            ".jpg",
            ".exe",
            ".pdf"
          ],
          correctAnswer: 2
        },
        {
          id: 5,
          text: "What is a safe way to check the authenticity of an email requesting account changes?",
          options: [
            "Reply to the email to confirm",
            "Click any links in the email to verify",
            "Call the company using a number from their official website",
            "Forward the email to a friend for a second opinion"
          ],
          correctAnswer: 2
        },
        {
          id: 6,
          text: "What does TLS (Transport Layer Security) do?",
          options: [
            "Encrypts emails in transit between email servers",
            "Scans emails for viruses",
            "Filters out spam emails",
            "Verifies the sender's identity"
          ],
          correctAnswer: 0
        },
        {
          id: 7,
          text: "Why is it important to log out of your email account on shared computers?",
          options: [
            "To save energy",
            "To free up memory on the computer",
            "To prevent unauthorized access to your account",
            "To ensure faster login next time"
          ],
          correctAnswer: 2
        },
        {
          id: 8,
          text: "Which of the following is NOT a common email authentication protocol?",
          options: [
            "SPF (Sender Policy Framework)",
            "DKIM (DomainKeys Identified Mail)",
            "DMARC (Domain-based Message Authentication, Reporting, and Conformance)",
            "SMTP (Simple Mail Transfer Protocol)"
          ],
          correctAnswer: 3
        },
        {
          id: 9,
          text: "What is the main advantage of using a password manager?",
          options: [
            "It makes all your passwords the same for easy remembering",
            "It generates and stores complex, unique passwords for each account",
            "It shares your passwords with trusted contacts",
            "It eliminates the need for passwords altogether"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          text: "Which of the following is the best practice for creating a strong passphrase?",
          options: [
            "Using a common phrase from a book or movie",
            "Combining unrelated words with numbers and symbols",
            "Using your favorite quote",
            "Repeating a word multiple times"
          ],
          correctAnswer: 1
        }
      ]
    },
    { 
      id: 3, 
      title: "Social Engineering Awareness", 
      description: "Understand and defend against social engineering tactics", 
      completed: false, 
      score: null,
      pages: [
        {
          id: 1,
          title: "Introduction to Social Engineering",
          content: `
            <h2>Introduction to Social Engineering</h2>
            <p>Social engineering is the art of manipulating people into giving up confidential information or performing actions that compromise security. Unlike technical hacking, social engineering relies on human interaction and often involves tricking people into breaking normal security procedures.</p>
            <p>Key aspects of social engineering include:</p>
            <ul>
              <li>Exploiting human psychology rather than technical vulnerabilities</li>
              <li>Using persuasion, influence, and manipulation techniques</li>
              <li>Targeting individuals or organizations to gain unauthorized access or information</li>
              <li>Often being the first step in a larger attack strategy</li>
            </ul>
            <h3>Why Social Engineering is Effective</h3>
            <p>Social engineering attacks are often successful because they exploit fundamental human tendencies and behaviors:</p>
            <ul>
              <li><strong>Trust:</strong> People are generally inclined to trust others, especially those who appear to be in positions of authority.</li>
              <li><strong>Fear:</strong> Threats or warnings can manipulate people into hasty actions.</li>
              <li><strong>Curiosity:</strong> People are naturally curious and may be tempted to click on intriguing links or open suspicious attachments.</li>
              <li><strong>Desire to Help:</strong> Many people have a natural inclination to be helpful, which attackers can exploit.</li>
              <li><strong>Lack of Awareness:</strong> Many individuals are simply unaware of the tactics used by social engineers.</li>
            </ul>
            <p>Understanding these psychological factors is crucial in developing effective defenses against social engineering attacks.</p>
          `
        },
        {
          id: 2,
          title: "Common Social Engineering Techniques",
          content: `
            <h2>Common Social Engineering Techniques</h2>
            <p>Social engineers use various techniques to manipulate their targets:</p>
            <ol>
              <li><strong>Phishing:</strong> Sending fraudulent emails or messages to trick recipients into revealing sensitive information.</li>
              <li><strong>Pretexting:</strong> Creating a fabricated scenario to extract information from a target.</li>
              <li><strong>Baiting:</strong> Offering something enticing to an end user in exchange for private data.</li>
              <li><strong>Tailgating:</strong> Following an authorized person into a restricted area.</li>
              <li><strong>Quid Pro Quo:</strong> Requesting private information in exchange for a service.</li>
            </ol>
            <h3>Phishing</h3>
            <p>Phishing is one of the most common forms of social engineering. It typically involves:</p>
            <ul>
              <li>Creating fake websites that mimic legitimate ones</li>
              <li>Sending emails that appear to be from trusted sources</li>
              <li>Using urgent or threatening language to prompt immediate action</li>
              <li>Requesting sensitive information like passwords or credit card details</li>
            </ul>
            <h3>Pretexting</h3>
            <p>In pretexting, the attacker creates a false narrative to obtain information:</p>
            <ul>
              <li>The attacker might impersonate co-workers, police, bank officials, or other trusted individuals</li>
              <li>They often do extensive research to make their story more believable</li>
              <li>The goal is to build trust and then exploit it to gather information</li>
            </ul>
            <p>Understanding these techniques is the first step in developing effective countermeasures against social engineering attacks.</p>
          `
        },
        {
          id: 3,
          title: "Defending Against Social Engineering",
          content: `
            <h2>Defending Against Social Engineering</h2>
            <p>While social engineering attacks can be sophisticated, there are several strategies to protect yourself and your organization:</p>
            <ol>
              <li><strong>Education and Awareness:</strong> Regular training for employees about social engineering tactics and how to recognize them.</li>
              <li><strong>Implement Strong Security Policies:</strong> Establish clear procedures for verifying identities and handling sensitive information.</li>
              <li><strong>Use Multi-Factor Authentication:</strong> This adds an extra layer of security beyond just passwords.</li>
              <li><strong>Be Skeptical:</strong> Encourage a healthy sense of skepticism, especially when dealing with unsolicited contacts.</li>
              <li><strong>Verify Identities:</strong> Always verify the identity of individuals requesting sensitive information, preferably through a different communication channel.</li>
              <li><strong>Keep Software Updated:</strong> Ensure all systems and software are up-to-date with the latest security patches.</li>
              <li><strong>Use Email Filters:</strong> Implement strong spam filters to reduce exposure to phishing attempts.</li>
            </ol>
            <h3>Creating a Security-Aware Culture</h3>
            <p>Building a culture of security awareness is crucial:</p>
            <ul>
              <li>Encourage employees to report suspicious activities or requests</li>
              <li>Conduct regular security awareness training sessions</li>
              <li>Perform simulated social engineering attacks to test and improve defenses</li>
              <li>Celebrate security-conscious behavior to reinforce good practices</li>
            </ul>
            <h3>What to Do If You Suspect a Social Engineering Attack</h3>
            <ol>
              <li>Don't panic or act hastily</li>
              <li>Do not provide any information or take any actions requested</li>
              <li>If at work, contact your IT security team immediately</li>
              <li>If personal, contact the purported organization directly using verified contact information</li>
              <li>Document the incident, including any relevant details</li>
              <li>Report the incident to appropriate authorities if necessary</li>
            </ol>
            <p>Remember, the best defense against social engineering is a well-informed and vigilant individual. Stay alert, question unusual requests, and always verify before sharing sensitive information.</p>
          `
        }
      ],
      scenarios: [
        {
          id: 1,
          title: "The Helpful IT Guy",
          content: `
            <h3>Scenario 1: The Helpful IT Guy</h3>
            <p>You receive a phone call at work:</p>
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
              <p><strong>Caller:</strong> "Hi, this is Mike from IT. We're doing some routine maintenance on the network and need to verify your login credentials. Can you please provide your username and password?"</p>
            </div>
          `,
          questions: [
            {
              id: 1,
              text: "What type of social engineering attack is this?",
              options: [
                "Phishing",
                "Pretexting",
                "Baiting",
                "Tailgating"
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              text: "What should you do in this situation?",
              options: [
                "Provide your username and password to help IT",
                "Ask for Mike's employee ID and call him back",
                "Hang up and report the incident to your actual IT department",
                "Give a fake username and password to see what happens"
              ],
              correctAnswer: 2
            },
            {
              id: 3,
              text: "Why is this type of attack often successful?",
              options: [
                "People generally trust authority figures",
                "IT often needs user credentials for maintenance",
                "Employees are required to cooperate with IT",
                "Phone calls are always secure"
              ],
              correctAnswer: 0
            }
          ]
        },
        {
          id: 2,
          title: "The Tailgater",
          content: `
            <h3>Scenario 2: The Tailgater</h3>
            <p>You're entering your office building and someone behind you says:</p>
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
              <p><strong>Person:</strong> "Oh, could you hold the door for me? I forgot my access card at home and I'm already late for a meeting!"</p>
            </div>
          `,
          questions: [
            {
              id: 1,
              text: "What social engineering technique is being used here?",
              options: [
                "Phishing",
                "Pretexting",
                "Tailgating",
                "Baiting"
              ],
              correctAnswer: 2
            },
            {
              id: 2,
              text: "What's the appropriate response in this situation?",
              options: [
                "Hold the door open to be polite",
                "Apologize and let the door close, directing them to reception",
                "Ask to see their employee ID",
                "Ignore them completely"
              ],
              correctAnswer: 1
            },
            {
              id: 3,
              text: "Why is tailgating a security risk?",
              options: [
                "It can allow unauthorized individuals access to secure areas",
                "It slows down entry for legitimate employees",
                "It puts too much strain on the door hinges",
                "It distracts security personnel"
              ],
              correctAnswer: 0
            }
          ]
        }
      ],
      questions: [
        {
          id: 1,
          text: "What is the primary goal of social engineering?",
          options: [
            "To install malware on computer systems",
            "To manipulate people into giving up confidential information or taking certain actions",
            "To break through firewalls and other technical security measures",
            "To disrupt network operations"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "Which of the following is NOT a common social engineering technique?",
          options: [
            "Phishing",
            "Pretexting",
            "Encryption",
            "Baiting"
          ],
          correctAnswer: 2
        },
        {
          id: 3,
          text: "Why are social engineering attacks often successful?",
          options: [
            "They exploit advanced technical vulnerabilities",
            "They rely on complex algorithms",
            "They manipulate human psychology and behavior",
            "They use sophisticated hacking tools"
          ],
          correctAnswer: 2
        },
        {
          id: 4,
          text: "What is 'pretexting' in the context of social engineering?",
          options: [
            "Creating a fabricated scenario to extract information",
            "Sending fraudulent emails",
            "Following someone into a restricted area",
            "Offering something enticing in exchange for information"
          ],
          correctAnswer: 0
        },
        {
          id: 5,
          text: "Which of the following is the best defense against social engineering attacks?",
          options: [
            "Installing the latest antivirus software",
            "Using a strong firewall",
            "Regular employee education and awareness training",
            "Implementing biometric security measures"
          ],
          correctAnswer: 2
        },
        {
          id: 6,
          text: "What should you do if you suspect you're being targeted by a social engineering attack?",
          options: [
            "Provide false information to mislead the attacker",
            "Engage with the attacker to gather more information",
            "Immediately report the incident to the appropriate authority",
            "Ignore it and hope they go away"
          ],
          correctAnswer: 2
        },
        {
          id: 7,
          text: "What is 'tailgating' in social engineering?",
          options: [
            "Following closely behind someone in a vehicle",
            "Repeatedly sending emails to a target",
            "Following an authorized person into a restricted area",
            "Monitoring someone's online activities"
          ],
          correctAnswer: 2
        },
        {
          id: 8,
          text: "Which human tendency do social engineers often exploit?",
          options: [
            "Laziness",
            "Greed",
            "Desire to be helpful",
            "All of the above"
          ],
          correctAnswer: 3
        },
        {
          id: 9,
          text: "What is a 'baiting' attack?",
          options: [
            "Using fear to manipulate targets",
            "Offering something enticing in exchange for information",
            "Impersonating a authority figure",
            "Sending mass emails with malicious links"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          text: "Why is it important to verify the identity of individuals requesting sensitive information?",
          options: [
            "It's a legal requirement",
            "It helps build trust",
            "It prevents unauthorized access to sensitive data",
            "It improves customer service"
          ],
          correctAnswer: 2
        }
      ]
    }
  ])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
      setCurrentPage('dashboard')
    }
  }, [])

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password) {
      setError('All fields are required')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    const userData = { name, email, password }
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    setCurrentPage('dashboard')
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      if (user.email === email && user.password === password) {
        setUser(user)
        setCurrentPage('dashboard')
      } else {
        setError('Invalid email or password')
      }
    } else {
      setError('User not found. Please sign up.')
    }
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage('landing')
  }

  const handleStartModule = (module: Module) => {
    setCurrentModule(module)
    setCurrentPageIndex(0)
    setModuleStep('guide')
    setCurrentPage('module')
  }

  const handleNextPage = () => {
    if (currentModule && currentPageIndex < currentModule.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1)
    } else {
      setModuleStep('simulation')
    }
  }

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1)
    }
  }

  const handleQuizSubmit = () => {
    if (!currentModule) return

    const score = quizAnswers.reduce((total, answer, index) => {
      return total + (answer === currentModule.questions[index].correctAnswer ? 1 : 0)
    }, 0)

    setQuizScore(score)

    if (score >= 7) {  // Changed from 5 to 7 to match the new 10-question format
      const updatedModules = modules.map(m => 
        m.id === currentModule.id ? { ...m, completed: true, score: score } : m
      )
      setModules(updatedModules)
      setCurrentModule(null)
      setCurrentPage('dashboard')
    }
  }

  const renderLandingPage = () => (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground transition-colors duration-300">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            PhishWise
          </motion.h1>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="outline" onClick={() => setCurrentPage('login')}>
              Login
            </Button>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-12">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Master Phishing Defense</h2>
            <p className="text-xl mb-8">Empower your team with cutting-edge phishing awareness training</p>
            <Button size="lg" onClick={() => setCurrentPage('signup')}>
              Sign Up <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { title: "Interactive Modules", description: "Comprehensive modules covering various phishing threats" },
              { title: "Real-world Simulations", description: "Practice identifying phishing attempts in realistic scenarios" },
              { title: "Progress Tracking", description: "Monitor your learning journey with detailed analytics" }
            ].map((feature, index) => (
              <div key={index} className="bg-card text-card-foreground p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </motion.section>
        </main>

        <footer className="bg-muted text-muted-foreground py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 PhishWise. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )

  const renderSignupPage = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Sign Up for PhishWise</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
      </div>
    </div>
  )

  const renderLoginPage = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Login to PhishWise</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </div>
    </div>
  )

  const renderDashboard = () => {
    const totalModules = modules.length
    const completedModules = modules.filter(module => module.completed).length
    const overallProgress = (completedModules / totalModules) * 100

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="w-full" />
            <p className="mt-2">{completedModules} of {totalModules} modules completed</p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => (
            <Card key={module.id}>
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{module.description}</p>
                {module.completed ? (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="mr-2" />
                    <span>Completed - Score: {module.score}/10</span>
                  </div>
                ) : index === 0 || modules[index - 1].completed ? (
                  <Button onClick={() => handleStartModule(module)}>
                    Start Module
                  </Button>
                ) : (
                  <div className="flex items-center text-muted-foreground">
                    <Lock className="mr-2" />
                    <span>Locked - Complete previous module to unlock</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const renderModuleContent = () => {
    if (!currentModule) return null

    return (
      <div className="container mx-auto px-4 py-8">
        <Button onClick={() => setCurrentPage('dashboard')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold mb-6">{currentModule.title}</h1>
        
        {moduleStep === 'guide' && (
          <>
            <div className="prose dark:prose-invert max-w-none mb-8">
              <h2>{currentModule.pages[currentPageIndex].title}</h2>
              <div dangerouslySetInnerHTML={{ __html: currentModule.pages[currentPageIndex].content }} />
            </div>
            <div className="flex justify-between">
              <Button onClick={handlePrevPage} disabled={currentPageIndex === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={handleNextPage}>
                {currentPageIndex < currentModule.pages.length - 1 ? 'Next' : 'Start Simulation'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {moduleStep === 'simulation' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Phishing Simulations</h2>
            <Tabs defaultValue={currentModule.scenarios[0].id.toString()} className="w-full">
              <TabsList>
                {currentModule.scenarios.map((scenario) => (
                  <TabsTrigger key={scenario.id} value={scenario.id.toString()}>
                    {scenario.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {currentModule.scenarios.map((scenario) => (
                <TabsContent key={scenario.id} value={scenario.id.toString()}>
                  <div className="prose dark:prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: scenario.content }} />
                  <div className="space-y-4">
                    {scenario.questions.map((question, index) => (
                      <div key={question.id} className="space-y-2">
                        <p className="font-semibold">{question.text}</p>
                        <RadioGroup onValueChange={(value) => {
                          // Handle answer selection
                        }}>
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2">
                              <RadioGroupItem value={optionIndex.toString()} id={`q${question.id}-${optionIndex}`} />
                              <Label htmlFor={`q${question.id}-${optionIndex}`}>{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            <Button onClick={() => setModuleStep('quiz')} className="mt-4">Next: Quiz</Button>
          </>
        )}

        {moduleStep === 'quiz' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Module Quiz</h2>
            {currentModule.questions.map((question, index) => (
              <div key={question.id} className="space-y-2">
                <p className="font-semibold">{question.text}</p>
                <RadioGroup onValueChange={(value) => {
                  const newAnswers = [...quizAnswers]
                  newAnswers[index] = parseInt(value)
                  setQuizAnswers(newAnswers)
                }}>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={optionIndex.toString()} id={`q${question.id}-${optionIndex}`} />
                      <Label htmlFor={`q${question.id}-${optionIndex}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
            <Button onClick={handleQuizSubmit} disabled={quizAnswers.length !== currentModule.questions.length}>
              Submit Quiz
            </Button>
            {quizScore !== null && (
              <Alert variant={quizScore >= 7 ? "default" : "destructive"}>
                <AlertDescription>
                  {quizScore >= 7 
                    ? `Congratulations! You scored ${quizScore}/10 and have completed this module.` 
                    : `You scored ${quizScore}/10. You need to score at least 7/10 to progress. Please try again.`}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-background text-foreground min-h-screen">
        {currentPage === 'landing' && renderLandingPage()}
        {currentPage === 'signup' && renderSignupPage()}
        {currentPage === 'login' && renderLoginPage()}
        {currentPage === 'dashboard' && renderDashboard()}
        {currentPage === 'module' && renderModuleContent()}
      </div>
    </div>
  )
}