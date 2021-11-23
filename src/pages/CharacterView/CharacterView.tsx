import React, { useContext, useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import style from './CharacterView.module.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { THUMBNAIL_CONTEXT } from '../../settings/contants'
import { getCharacter } from '../../services/characters.service'
import { CharacterImage, Loader } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeather, faIdCard, faInfo, faBackward } from '@fortawesome/free-solid-svg-icons'

const BIOGRAPHY_OPTIONS = {
  '1': {
    title: 'INFORMATION',
    icon: <FontAwesomeIcon icon={faInfo} />
  },
  '2': {
    title: 'DETAIL',
    icon: <FontAwesomeIcon icon={faIdCard} />
  },
  '3': {
    title: 'HABILITIES',
    icon: <FontAwesomeIcon icon={faFeather} />
  }
} as any

const CharacterView = () => {
  const { characterSlug } = useParams()
  const navigate = useNavigate()
  const { characters } = useContext(THUMBNAIL_CONTEXT)
  const [character, setCharacter] = useState(() =>
    characters.length > 0 ? characters.find((c) => c.id === characterSlug) : null
  )
  const [biographyOption, setBiographyOption] = useState('1')

  const biographyData = useMemo(() => {
    if (character !== null) {
      const { work, biography, appearance, powerstats } = character
      switch (biographyOption) {
        case '1':
          return {
            'Real Name': biography['full-name'],
            Occupation: work.occupation,
            'Based In': biography['place-of-birth'],
            'Eye Color': appearance['eye-color'],
            'Hair Color': appearance['hair-color'],
            Weight: appearance.weight[0],
            Height: appearance.height[0],
            'First Appearance': biography['first-appearance']
          }
        case '2':
          return {
            'Full Name': biography['full-name'],
            'Alter Egos': biography['alter-egos'],
            Race: appearance.race,
            Gender: appearance.gender
          }
        case '3':
          return {
            Combat: `${Number.isNaN(+powerstats.combat) ? 0 : +powerstats.combat}%`,
            Durability: `${Number.isNaN(+powerstats.durability) ? 0 : +powerstats.durability}%`,
            Intelligence: `${isNaN(+powerstats.intelligence) ? 0 : +powerstats.intelligence}%`,
            Power: `${isNaN(+powerstats.power) ? 0 : +powerstats.power}%`,
            Speed: `${isNaN(+powerstats.speed) ? 0 : +powerstats.speed}%`,
            Strength: `${isNaN(+powerstats.strength) ? 0 : +powerstats.strength}%`
          }
      }
    }
    return null
  }, [character, biographyOption]) as any

  useEffect(() => {
    if (character === null) {
      ;(async () => {
        setCharacter(await getCharacter(characterSlug ?? ''))
      })().catch(console.error)
    }
  }, [character, characterSlug])

  return (
    <section className={cn(style.root)}>
      <button className={style.back} onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faBackward} /> BACK
      </button>
      {character === null ? (
        <Loader />
      ) : (
        <>
          <h1 className={cn(['heading', 'heading--primary'], style.name)}>
            {character?.name ?? ''}
          </h1>
          <article className={cn(style.content)}>
            <div className={style.details}>
              <h3 className={style.legend}>{BIOGRAPHY_OPTIONS[biographyOption].title}</h3>
              <div className={cn(style.options)}>
                {Object.keys(BIOGRAPHY_OPTIONS).map((option: string) => (
                  <button
                    className={cn(
                      style.option,
                      option === biographyOption ? style.optionSelected : ''
                    )}
                    key={option}
                    onClick={() => setBiographyOption(option)}
                  >
                    {BIOGRAPHY_OPTIONS[option].icon}
                  </button>
                ))}
              </div>
              <div className={cn(style.information)}>
                <ul>
                  {biographyData !== null &&
                    Object.keys(biographyData).map((key) => (
                      <li key={key} className={style.item}>
                        <span className={style.label}>{key}:</span>
                        <span className={style.data}>{biographyData[key]}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <CharacterImage source={character?.image?.url} />
          </article>
        </>
      )}
    </section>
  )
}

export default CharacterView
