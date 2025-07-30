import React from 'react'

interface Props {
  onClose: () => void
}

const mbtiData = [
  {
    group: 'Analysts',
    value: 'GROWTH',
    types: [
      { code: 'INTJ', name: 'The Architect', traits: 'Strategic, independent, logical, visionary' },
      { code: 'INTP', name: 'The Logician', traits: 'Curious, analytical, inventive, abstract thinker' },
      { code: 'ENTJ', name: 'The Commander', traits: 'Assertive, organized, bold, natural leader' },
      { code: 'ENTP', name: 'The Debater', traits: 'Energetic, curious, loves challenges and ideas' },
    ],
  },
  {
    group: 'Diplomats',
    value: 'COLLABORATION, CARE',
    types: [
      { code: 'INFJ', name: 'The Advocate', traits: 'Insightful, empathetic, idealistic, deep thinker' },
      { code: 'INFP', name: 'The Mediator', traits: 'Creative, introspective, compassionate, idealistic' },
      { code: 'ENFJ', name: 'The Protagonist', traits: 'Charismatic, inspiring, responsible, socially aware' },
      { code: 'ENFP', name: 'The Campaigner', traits: 'Enthusiastic, spontaneous, people-centered' },
    ],
  },
  {
    group: 'Sentinels',
    value: 'COLLABORATION',
    types: [
      { code: 'ISTJ', name: 'The Logistician', traits: 'Detail-oriented, responsible, rule-abiding, steady' },
      { code: 'ISFJ', name: 'The Defender', traits: 'Warm, committed, meticulous, quietly supportive' },
      { code: 'ESTJ', name: 'The Executive', traits: 'Organized, decisive, traditional, leadership-focused' },
      { code: 'ESFJ', name: 'The Consul', traits: 'Social, loyal, caring, community-focused' },
    ],
  },
  {
    group: 'Explorers',
    value: 'COLLABORATION',
    types: [
      { code: 'ISTP', name: 'The Virtuoso', traits: 'Hands-on, logical, independent, action-oriented' },
      { code: 'ISFP', name: 'The Adventurer', traits: 'Gentle, artistic, adaptable' },
      { code: 'ESTP', name: 'The Entrepreneur', traits: 'Energetic, risk-taking, practical, results-driven' },
      { code: 'ESFP', name: 'The Entertainer', traits: 'Fun-loving, spontaneous, expressive, sociable' },
    ],
  },
]

const InfoModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-lg p-6 overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl font-bold"
          aria-label="Close"
        >
          ×
        </button>
        
        {mbtiData.map((group, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-2xl font-bold text-green-800 mb-1">{group.group}</h2>
            <p className="text-sm text-gray-500 font-medium mb-4">
              Core Value: <span className="font-semibold text-green-700">{group.value}</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {group.types.map((type, i) => (
                <div
                  key={i}
                  className="bg-green-50 border border-green-200 rounded-xl p-4 shadow hover:shadow-md transition"
                >
                  <h3 className="text-xl font-bold text-green-900">{type.code}</h3>
                  <p className="text-md text-green-800 font-medium italic mb-2">{type.name}</p>
                  <p className="text-sm text-gray-700">{type.traits}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoModal
