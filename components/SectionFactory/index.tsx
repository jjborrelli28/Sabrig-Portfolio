import type {
  CallToActionEntrySkeleton,
  FeaturesEntrySkeleton,
  FrequentlyAskedQuestionsEntrySkeleton,
  GalleryEntrySkeleton,
  HeroEntrySkeleton,
  SpotlightsEntrySkeleton,
  TestimonialsEntrySkeleton,
} from '@/lib/contentful/getPageData'
import type { Entry } from 'contentful'
import DynamicSection from './DynamicSection'
import type { CallToActionProps } from './components/CallToAction'
import type { FeaturesProps } from './components/Features'
import type { FrequentlyAskedQuestionsProps } from './components/FrenquentlyAskedQuestions'
import type { GalleryProps } from './components/Gallery'
import type { HeroProps } from './components/Hero'
import type { SpotlightsProps } from './components/Spotlights'
import type { TestimonialsProps } from './components/Testimonials'

type Section =
  | Entry<CallToActionEntrySkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>
  | Entry<FeaturesEntrySkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>
  | Entry<
      FrequentlyAskedQuestionsEntrySkeleton,
      'WITHOUT_UNRESOLVABLE_LINKS',
      string
    >
  | Entry<GalleryEntrySkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>
  | Entry<HeroEntrySkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>
  | Entry<SpotlightsEntrySkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>
  | Entry<TestimonialsEntrySkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>
  | undefined

type SectionFactoryProps = {
  sections: Section[] | undefined
}

const SectionFactory = ({ sections }: SectionFactoryProps) => {
  if (!sections) return null

  return sections.map((section, i) => {
    if (!section) return null

    const contentTypeId = section.sys.contentType.sys.id
    const fields = section.fields

    switch (contentTypeId) {
      case 'callToAction':
        return (
          <DynamicSection.CallToAction
            key={i}
            fields={fields as CallToActionProps['fields']}
          />
        )
      case 'features':
        return (
          <DynamicSection.Features
            key={i}
            fields={fields as FeaturesProps['fields']}
          />
        )

      case 'frequentlyAskedQuestions':
        return (
          <DynamicSection.FrequentlyAskedQuestions
            key={i}
            fields={fields as FrequentlyAskedQuestionsProps['fields']}
          />
        )
      case 'gallery':
        return (
          <DynamicSection.Gallery
            key={i}
            fields={fields as GalleryProps['fields']}
          />
        )
      case 'hero':
        return (
          <DynamicSection.Hero key={i} fields={fields as HeroProps['fields']} />
        )

      case 'spotlights':
        return (
          <DynamicSection.Spotlights
            key={i}
            fields={fields as SpotlightsProps['fields']}
          />
        )
      case 'testimonials':
        return (
          <DynamicSection.Testimonials
            key={i}
            fields={fields as TestimonialsProps['fields']}
          />
        )
      default:
        return null
    }
  })
}

export default SectionFactory
