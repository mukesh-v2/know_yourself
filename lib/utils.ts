import { AnswerProps } from "@/app/components/AnswerModal"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


interface GroupClassification {
  group: string
  score: number
  trait: string
}

export function classifyMBTI(data: AnswerProps): GroupClassification[] {
  const answers = [
    data.answerOne,
    data.answerTwo,
    data.answerThree,
    data.answerFour,
    data.answerFive,
    data.answerSix,
    data.answerSeven,
    data.answerEight,
    data.answerNine,
    data.answerTen,
    data.answerEleven,
    data.answerTwelve,
    data.answerThirteen,
    data.answerFourteen,
    data.answerFifteen,
    data.answerSixteen
  ]

  const classifications = [
    ['Extraversion', 'Introversion'],
    ['Sensing', 'Intuition'],
    ['Thinking', 'Feeling'],
    ['Judging', 'Perceiving']
  ]

  const results: GroupClassification[] = []

  for (let i = 0; i < 4; i++) {
    const groupSum = answers.slice(i * 4, i * 4 + 4).reduce((sum, val) => sum + val, 0)
    const trait = groupSum > 10 ? classifications[i][0] : classifications[i][1] // >10 out of 20 means leaning first trait
    results.push({
      group: `Group ${i + 1}`,
      score: groupSum,
      trait
    })
  }
  return results
}

interface GroupScore {
  group: string
  score: number
  trait: string
}


interface ChartDataPoint {
  name: string
  score: number
  avgScore: number
  amt: number
  percentage:number
}

export function getGroupName(group:string):string
{
  if(group=='Group 1') return 'Mind'
  else if(group=='Group 2') return 'Information'
  else if(group=='Group 3') return 'Decision'
  else return 'Structure'
}

function getAvgScore(group:string):number
{
  if(group=='Group 1') return 15
  else if(group=='Group 2') return 12
  else if(group=='Group 2') return 14
  else return 9
}
export function transformToChartData(data: GroupScore[]): ChartDataPoint[] {
  return data.map((item) => ({
    name: getGroupName(item.group),
    score: item.score,
    avgScore: getAvgScore(item.group),
    percentage: Math.round((item.score / 20) * 100), 
    amt: 0,
  }))
}

export function getPersonalityType(data: AnswerProps) {
  const traits = classifyMBTI(data)

  const [mind, info, decision, structure] = traits.map(t => t.trait)

  const code =
    (mind === 'Extraversion' ? 'E' : 'I') +
    (info === 'Sensing' ? 'S' : 'N') +
    (decision === 'Thinking' ? 'T' : 'F') +
    (structure === 'Judging' ? 'J' : 'P')

  const profile = MBTI_MAP[code]

  return {
    typeCode: code,
    ...profile,
  }
}

interface MBTIValueMapping {
  type: string
  title: string
  description: string
  category: string
  value: string
  alignedValues: string[] // Add this
}

export const MBTI_MAP: Record<string, MBTIValueMapping> = {
  INTJ: {
    type: 'INTJ',
    title: 'The Architect',
    description: 'Strategic, independent, logical, visionary',
    category: 'Analyst',
    value: 'GROWTH',
    alignedValues: ['Growth', 'Quality', 'Trust'],
  },
  INTP: {
    type: 'INTP',
    title: 'The Logician',
    description: 'Curious, analytical, inventive, abstract thinker',
    category: 'Analyst',
    value: 'GROWTH',
    alignedValues: ['Growth', 'Quality', 'Trust'],
  },
  ENTJ: {
    type: 'ENTJ',
    title: 'The Commander',
    description: 'Assertive, organized, bold, natural leader',
    category: 'Analyst',
    value: 'GROWTH',
    alignedValues: ['Growth', 'Quality', 'Trust'],
  },
  ENTP: {
    type: 'ENTP',
    title: 'The Debater',
    description: 'Energetic, curious, loves challenges and ideas',
    category: 'Analyst',
    value: 'GROWTH',
    alignedValues: ['Growth', 'Quality', 'Trust'],
  },
  INFJ: {
    type: 'INFJ',
    title: 'The Advocate',
    description: 'Insightful, empathetic, idealistic, deep thinker',
    category: 'Diplomat',
    value: 'CARE',
    alignedValues: ['Care', 'Collaboration', 'Trust'],
  },
  INFP: {
    type: 'INFP',
    title: 'The Mediator',
    description: 'Creative, introspective, compassionate, idealistic',
    category: 'Diplomat',
    value: 'CARE',
    alignedValues: ['Care', 'Collaboration', 'Trust'],
  },
  ENFJ: {
    type: 'ENFJ',
    title: 'The Protagonist',
    description: 'Charismatic, inspiring, responsible, socially aware',
    category: 'Diplomat',
    value: 'CARE',
    alignedValues: ['Care', 'Collaboration', 'Trust'],
  },
  ENFP: {
    type: 'ENFP',
    title: 'The Campaigner',
    description: 'Enthusiastic, spontaneous, people-oriented',
    category: 'Diplomat',
    value: 'CARE',
    alignedValues: ['Care', 'Collaboration', 'Trust'],
  },
  ISTJ: {
    type: 'ISTJ',
    title: 'The Logistician',
    description: 'Detail-oriented, responsible, rule-abiding, steady',
    category: 'Sentinel',
    value: 'COLLABORATION',
    alignedValues: ['Collaboration', 'Quality', 'Trust'],
  },
  ISFJ: {
    type: 'ISFJ',
    title: 'The Defender',
    description: 'Warm, committed, meticulous, quietly supportive',
    category: 'Sentinel',
    value: 'COLLABORATION',
    alignedValues: ['Collaboration', 'Quality', 'Trust'],
  },
  ESTJ: {
    type: 'ESTJ',
    title: 'The Executive',
    description: 'Organized, decisive, traditional, leadership-focused',
    category: 'Sentinel',
    value: 'COLLABORATION',
    alignedValues: ['Collaboration', 'Quality', 'Trust'],
  },
  ESFJ: {
    type: 'ESFJ',
    title: 'The Consul',
    description: 'Social, loyal, caring, community-focused',
    category: 'Sentinel',
    value: 'COLLABORATION',
    alignedValues: ['Collaboration', 'Quality', 'Trust'],
  },
  ISTP: {
    type: 'ISTP',
    title: 'The Virtuoso',
    description: 'Hands-on, logical, independent, action-oriented',
    category: 'Explorer',
    value: 'COLLABORATION',
    alignedValues: ['Collaboration', 'Growth', 'Trust'],
  },
  ISFP: {
    type: 'ISFP',
    title: 'The Adventurer',
    description: 'Gentle, artistic, adaptable',
    category: 'Explorer',
    value: 'COLLABORATION',
    alignedValues: ['Collaboration', 'Care', 'Trust'],
  },
  ESTP: {
    type: 'ESTP',
    title: 'The Entrepreneur',
    description: 'Energetic, risk-taking, practical, results-driven',
    category: 'Explorer',
    value: 'COLLABORATION',
    alignedValues: ['Collaboration', 'Growth', 'Trust'],
  },
  ESFP: {
    type: 'ESFP',
    title: 'The Entertainer',
    description: 'Fun-loving, spontaneous, expressive, sociable',
    category: 'Explorer',
    value: 'COLLABORATION',
    alignedValues: ['Collaboration', 'Care', 'Trust'],
  },
}

export const personalityData = {
  INTJ: {
    intro: "INTJs (The Architect) are strategic thinkers—independent, insightful, and eager to improve systems.",
    strengths: [
      "Rational – Relies on logic and objective analysis rather than emotion.",
      "Informed – Seeks out knowledge constantly and stays well-read.",
      "Independent – Comfortable making decisions without needing approval.",
      "Determined – Pursues long-term goals with persistence and focus.",
      "Curious – Questions assumptions and dives deep into ideas.",
      "Original – Approaches problems with creativity and fresh perspectives."
    ],
    weaknesses: [
      "Arrogant – May view their intelligence as superior to others.",
      "Dismissive of emotions – Often neglect emotional nuance in conversations.",
      "Overly critical – Sets very high standards and judges harshly.",
      "Combative – Enjoys intellectual conflict, sometimes too aggressively.",
      "Socially clueless – Can struggle with small talk and social cues."
    ],
    workplaceHabits: `
      INTJs excel in structured, analytical roles where autonomy is respected.
      - Thrive in environments that encourage long-term planning and logical analysis.
      - Dislike inefficiency and emotionally-driven decision-making.
      - Prefer leading with competence over popularity.
      - Often set high standards that may intimidate coworkers.
    `
  },
  INFJ: {
    intro: "INFJs (The Advocate) are idealistic and creative helpers driven by a deep sense of purpose.",
    strengths: [
      "Insightful – Perceives patterns and deeper meanings in people and situations.",
      "Inspiring – Motivates others with vision and emotional conviction.",
      "Decisive – Balances idealism with firm judgment and goal-setting.",
      "Altruistic – Focuses on doing good for others without expecting rewards.",
      "Passionate – Committed to causes that reflect their inner values.",
      "Sensitive – Deeply attuned to emotional undercurrents in relationships."
    ],
    weaknesses: [
      "Overly sensitive – Can take criticism very personally.",
      "Extremely private – Often keeps feelings and thoughts to themselves.",
      "Perfectionistic – Sets unrealistically high standards for themselves.",
      "Overly idealistic – May get discouraged when reality doesn’t match ideals.",
      "Burnout-prone – Tends to overextend themselves emotionally and physically."
    ],
    workplaceHabits: `
      INFJs prefer meaningful roles aligned with their values.
      - Seek harmony and emotional authenticity in teams.
      - Work best in calm, focused environments without shallow interactions.
      - Are diplomatic and empathetic leaders, often uplifting quieter voices.
    `
  },
  ENFP: {
    intro: "ENFPs (The Campaigner) are energetic, curious, and driven by the possibilities of life.",
    strengths: [
      "Energetic – Brings enthusiasm and vitality to projects and teams.",
      "Imaginative – Sees potential and unique connections others might miss.",
      "Empathetic – Understands and connects with others' feelings deeply.",
      "Curious – Constantly seeks new ideas, experiences, and challenges.",
      "Charming – Naturally engaging and inspiring to those around them."
    ],
    weaknesses: [
      "Disorganized – Struggles with structure and time management.",
      "Easily distracted – Can shift focus before finishing tasks.",
      "Overthinkers – May get lost in possibilities and hypothetical worries.",
      "Highly emotional – Reactions can be intense and mood-driven."
    ],
    workplaceHabits: `
      ENFPs thrive in collaborative, fast-paced, and creative settings.
      - Love brainstorming, initiating projects, and inspiring others.
      - Dislike rigid schedules or bureaucratic red tape.
      - Bring positivity and team spirit, but may lose interest in long-term follow-through.
    `
  },
  INFP: {
    intro: "INFPs (The Mediator) are poetic, kind, and driven by their values and vision.",
    strengths: [
      "Empathetic – Deeply understands others' emotions and perspectives.",
      "Loyal – Stays true to people and principles over time.",
      "Curious – Open to exploring new ideas and meanings.",
      "Creative – Expresses themselves through unique and imaginative ways.",
      "Open-minded – Accepts differences and encourages individuality."
    ],
    weaknesses: [
      "Overly idealistic – May expect perfection in a flawed world.",
      "Conflict-averse – Avoids disagreements, even when necessary.",
      "Easily overwhelmed – Struggles under pressure or chaos.",
      "Struggle with criticism – Takes feedback very personally."
    ],
    workplaceHabits: `
      INFPs seek purpose in their work and value authenticity over conformity.
      - Best suited for creative or humanitarian roles.
      - Prefer independent work over group dynamics.
      - Struggle with deadlines and hierarchy, but excel when emotionally invested.
    `
  },
  ENTJ: {
    intro: "ENTJs (The Commander) are natural-born leaders with a strong drive for success and efficiency.",
    strengths: [
      "Efficient – Streamlines systems and increases productivity.",
      "Energetic – Leads with drive and contagious enthusiasm.",
      "Confident – Projects strength and decisiveness.",
      "Strategic – Sees long-term goals and orchestrates the path forward.",
      "Charismatic – Naturally inspires and directs others."
    ],
    weaknesses: [
      "Stubborn – Holds tightly to opinions and methods.",
      "Dominant – May overpower others in discussions.",
      "Insensitive – Often overlooks emotional dynamics.",
      "Impatient – Expects rapid results and quick action."
    ],
    workplaceHabits: `
      ENTJs thrive in leadership and strategic roles.
      - Excel at delegating and improving operational efficiency.
      - May struggle with emotional nuance or overly collaborative structures.
      - Prefer clear hierarchies and measurable outcomes.
    `
  },
  ENTP: {
    intro: "ENTPs (The Debater) are quick-witted, curious, and love intellectual challenges.",
    strengths: [
      "Quick-thinking – Responds fast in conversations and problem-solving.",
      "Energetic – Enthusiastic and tireless in pursuing ideas.",
      "Creative – Always generating new and inventive solutions.",
      "Charismatic – Draws others in with humor and confidence.",
      "Informed – Collects knowledge from many domains."
    ],
    weaknesses: [
      "Argumentative – Can turn discussions into debates.",
      "Insensitive – May dismiss emotional concerns.",
      "Easily bored – Constantly seeks novelty and stimulation.",
      "Lack follow-through – Starts more projects than they finish."
    ],
    workplaceHabits: `
      ENTPs flourish in flexible, idea-rich environments.
      - Thrive on debate and problem-solving.
      - Resist repetitive or rigid tasks.
      - Constantly seek innovation, often challenging the status quo.
    `
  },
  ISTJ: {
    intro: "ISTJs (The Logistician) are responsible, meticulous, and grounded in facts.",
    strengths: [
      "Honest – Values truth and integrity above all.",
      "Responsible – Takes commitments and obligations seriously.",
      "Organized – Excels in managing systems and schedules.",
      "Loyal – Stands by people and principles consistently.",
      "Practical – Prefers realistic and efficient approaches."
    ],
    weaknesses: [
      "Stubborn – Reluctant to accept new methods or changes.",
      "Insensitive – Can prioritize facts over feelings.",
      "Judgmental – Quickly forms strong opinions of others.",
      "Uncreative – May struggle with abstract or untested ideas."
    ],
    workplaceHabits: `
      ISTJs excel in roles with clear expectations and structure.
      - Value loyalty, tradition, and thoroughness.
      - Prefer task-based responsibilities over collaboration.
      - May resist rapid change or ambiguous situations.
    `
  },
  ISFJ: {
    intro: "ISFJs (The Defender) are nurturing, responsible, and quietly dedicated to helping others.",
    strengths: [
      "Supportive – Always willing to lend a hand or listening ear.",
      "Reliable – Can be counted on to follow through.",
      "Patient – Handles delays or difficulties calmly.",
      "Loyal – Committed and dependable in relationships.",
      "Practical – Values routine and step-by-step solutions."
    ],
    weaknesses: [
      "Overcommitted – Takes on too many responsibilities.",
      "Shy – Reluctant to share their ideas or needs.",
      "Sensitive to criticism – Takes feedback personally.",
      "Unassertive – May suppress opinions to maintain harmony."
    ],
    workplaceHabits: `
      ISFJs are team players who bring consistency and warmth.
      - Prefer behind-the-scenes roles where they can support others.
      - Thrive in orderly, people-oriented environments.
      - May avoid conflict even when necessary.
    `
  },
  ESTJ: {
    intro: "ESTJs (The Executive) are dedicated managers who uphold traditions and order.",
    strengths: [
      "Organized – Efficient and structured in approach.",
      "Honest – Straightforward and values integrity.",
      "Loyal – Stands firm in support of team and rules.",
      "Decisive – Takes quick, confident action.",
      "Dedicated – Willing to work hard to meet goals."
    ],
    weaknesses: [
      "Stubborn – Often believes their way is the best.",
      "Bossy – May micromanage or control situations.",
      "Unempathetic – Struggles to understand emotional perspectives.",
      "Inflexible – Resists change or new ideas."
    ],
    workplaceHabits: `
      ESTJs shine in structured, authoritative positions.
      - Lead with discipline and prefer traditional systems.
      - Expect efficiency and adherence to protocol.
      - Value results and are quick decision-makers.
    `
  },
  ESFJ: {
    intro: "ESFJs (The Consul) are socially tuned caretakers who love bringing people together.",
    strengths: [
      "Loyal – Invested in maintaining relationships.",
      "Caring – Deeply concerned about others’ needs.",
      "Organized – Keeps people and tasks well managed.",
      "Sociable – Enjoys being around and helping others.",
      "Reliable – Consistently delivers on promises."
    ],
    weaknesses: [
      "Overly selfless – Prioritizes others at their own expense.",
      "Need approval – Craves validation from others.",
      "Sensitive to conflict – Dislikes tension or disagreement."
    ],
    workplaceHabits: `
      ESFJs thrive in supportive and people-centered roles.
      - Excel at team coordination, morale, and hospitality.
      - Prefer harmony and structure.
      - Often serve as the emotional backbone of teams.
    `
  },
  ESTP: {
    intro: "ESTPs (The Entrepreneur) are energetic doers who love solving problems in the moment.",
    strengths: [
      "Energetic – Ready to jump into action without hesitation.",
      "Bold – Willing to take risks and speak up.",
      "Practical – Uses common sense and real-world logic.",
      "Perceptive – Observes and reacts quickly to surroundings.",
      "Direct – Communicates clearly and with impact."
    ],
    weaknesses: [
      "Impatient – Struggles with slow or drawn-out processes.",
      "Risk-prone – Can act impulsively without planning.",
      "Insensitive – May overlook others’ emotions.",
      "Defiant of rules – Questions authority and structure."
    ],
    workplaceHabits: `
      ESTPs thrive in fast-paced, action-oriented jobs.
      - Prefer hands-on problem-solving over theory.
      - Get bored with long meetings or routine tasks.
      - Natural troubleshooters who think on their feet.
    `
  },
  ESFP: {
    intro: "ESFPs (The Entertainer) are spontaneous, playful, and energetic.",
    strengths: [
      "Enthusiastic – Excited to engage with the world.",
      "Friendly – Warm and approachable to all.",
      "Observant – Attuned to details and environment.",
      "Creative – Enjoys expressing themselves in unique ways.",
      "Flexible – Adapts quickly to changing situations."
    ],
    weaknesses: [
      "Easily bored – Needs stimulation and novelty.",
      "Impulsive – May act without considering consequences.",
      "Sensitive – Takes criticism or rejection to heart.",
      "Struggles with structure – Avoids strict schedules or rules."
    ],
    workplaceHabits: `
      ESFPs bring vibrancy and adaptability to teams.
      - Shine in public-facing or creative roles.
      - Prefer flexible, people-oriented environments.
      - Dislike rigid rules or repetitive routines.
    `
  },
  ISTP: {
    intro: "ISTPs (The Virtuoso) are analytical, curious, and hands-on problem solvers.",
    strengths: [
      "Rational – Breaks down problems logically and clearly.",
      "Practical – Focuses on what works here and now.",
      "Spontaneous – Makes quick decisions when needed.",
      "Creative – Uses tools and ideas in unconventional ways.",
      "Independent – Prefers working solo and figuring things out."
    ],
    weaknesses: [
      "Private – Keeps thoughts and feelings hidden.",
      "Insensitive – May downplay emotional cues.",
      "Easily bored – Needs variety and challenge.",
      "Risky – May pursue thrill-seeking or unsafe behavior."
    ],
    workplaceHabits: `
      ISTPs work best independently with tangible outcomes.
      - Thrive in technical, troubleshooting roles.
      - Dislike micromanagement and office drama.
      - Quiet but resourceful when solving crises.
    `
  },
  ISFP: {
    intro: "ISFPs (The Adventurer) are gentle, artistic, and grounded in the present.",
    strengths: [
      "Sensitive – Feels deeply and values compassion.",
      "Imaginative – Thinks creatively and artistically.",
      "Charming – Wins people over with warmth and humility.",
      "Flexible – Open to others and adaptable.",
      "Curious – Explores life through new experiences."
    ],
    weaknesses: [
      "Shy – Avoids drawing attention to themselves.",
      "Avoids planning – Prefers going with the flow.",
      "Indecisive – Has trouble making firm choices.",
      "Easily stressed – Feels pressure strongly."
    ],
    workplaceHabits: `
      ISFPs prefer creative, low-conflict environments.
      - Value freedom, harmony, and beauty in their work.
      - Avoid strict deadlines and rigid systems.
      - Often act as empathetic mediators in teams.
    `
  },
  ENFJ: {
    intro: "ENFJs (The Protagonist) are charismatic leaders focused on growth and cooperation.",
    strengths: [
      "Empathetic : Tunes into others feelings and needs.",
      "Inspirational : Motivates others with optimism and heart.",
      "Reliable : Keeps their word and follows through.",
      "Altruistic – Values making a difference for others.",
      "Organized – Plans and manages people and resources efficiently."
    ],
    weaknesses: [
      "Overcommitted : Takes on too many responsibilities.",
      "Too idealistic – May expect too much from others.",
      "Sensitive to criticism – Takes negative feedback hard."
    ],
    workplaceHabits: `
      ENFJs motivate and organize teams toward a greater goal.
      - Prefer collaborative and people-driven environments.
      - Blend strong leadership with emotional insight.
      - May struggle with setting boundaries or saying no.
    `
  },
  INTP: {
    intro: "INTPs (The Logician) are abstract thinkers who love exploring ideas and systems.",
    strengths: [
      "Analytical – Breaks problems down to their core.",
      "Objective – Keeps feelings separate from reasoning.",
      "Curious – Loves learning and pushing boundaries.",
      "Inventive – Creates new and unique solutions.",
      "Independent – Works best when given freedom."
    ],
    weaknesses: [
      "Absent-minded – Easily distracted by thoughts.",
      "Insensitive – Focuses on logic over emotion.",
      "Noncommittal – Struggles to stick with one idea or plan.",
      "Socially withdrawn – Needs lots of solitude."
    ],
    workplaceHabits: `
      INTPs need freedom to experiment and reflect.
      - Prefer solo projects and problem-solving challenges.
      - Dislike repetitive or highly social work.
      - Thrive when trusted to innovate without constraints.
    `
  }
} as Record<string, {
  intro: string;
  strengths: string[];
  weaknesses: string[];
  workplaceHabits: string;
}>;

export function getFullPersonalityDetails(type: string) {
  return personalityData[type as keyof typeof personalityData]
}

export const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${s}s`
}
