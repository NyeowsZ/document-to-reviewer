import { ReviewerData } from '../types/reviewer';

export const SAMPLE_REVIEWERS: ReviewerData[] = [
  // 1. STUDY DOCUMENT REVIEWER (1:1 Exact Verbatim Conversion from Global Demography PDF Presentation Slides)
  {
    id: 'doc-demo-101',
    title: 'Global Demography (Group 3)',
    docType: 'pdf',
    fileName: 'Global_Demography_Group3.pdf',
    fileSize: '5.8 MB',
    uploadDate: 'Just now',
    reviewerType: 'document',
    rawMarkdown: `# Global Demography (Group 3)

## OBJECTIVES:
1. Define key demographic terms and analyze how they shape population structures;
2. Synthesize the concept of globalization in relation to demography and population; and
3. Explain the theory of demographic transition adn its effects on global population

---

## TERMINOLOGIES IN DEMOGRAPHY

- **[[Demography]]**: The statistical study of human populations. Concerned with birth, deaths, income or the incidence of disease which later illustrates the changing structure of human population.
- **[[Demographic Change]]**: The growth or decline of the total population, birth, death and migration.
- **[[Demographic Measurement]]**: The study and measurement of population using measurement tools.
- **[[Population]]**: The number of people live in a specific place.
- **[[Population Density]]**: The number of people who live in a place per square km.
- **[[Size]]**: The number of person in a population.
- **[[Distribution]]**: Arrangement of population in a space at a given time.
- **[[Structure]]**: Distribution of population among its sex and age groupings.
- **[[Mortality Rate]]**: Number of deaths in a place during a year.
- **[[Life Expectancy]]**: Number of years a person is expected to live in a specific place.

---

## GLOBAL DEMOGRAPHY

- The trends and practices in world politics
- The study of the issues and developments of the global population

---

## GLOBAL CIVIL SOCIETY

- Where transnational non-governmental organizations and social movements operate and offer an alternative to transnational corporations
- The role of a global civil society in global demography is its salient influence on institutional decision-making, affecting the populations at large

---

## SOURCES OF DATA

1. **[[Census]]**: Comprehensive official count of population.
2. **[[National Survey]]**: Targeted statistical sampling of population metrics.
3. **[[Registration of Vital Events]]**: Official recording of life events including births, deaths, and marriages.
4. **[[Demographic Studies]]**: Academic and analytical research on population dynamics.

---

## DEMOGRAPHIC PROCESSES

- **[[Mortality]]**: Decreases the population through deaths, affecting life expectancy and population growth.
- **[[Marriage]]**: Influences household formation, fertility rates, and social roles, impacting population trends.
- **[[Migration]]**: Alters population size and distribution by moving people in or out of a place.
- **[[Social Mobility]]**: Reflects changes in social and economic status, influencing patterns in education, occupation, and health, which all indirectly shape demographic behavior.
- **[[Fertility]]**: Increases the population through births, shaping age and gender structure.

---

## DEMOGRAPHIC PHENOMENON

- The Distribution of Population
- The Composition of Population
- Changes of Population Size

---

## ASPECTS OF DEMOGRAPHIC MEASUREMENT

1. **[[Population Static]]**: A group where the number of individuals remains constant over time due to factors like the absence of births, deaths, or migration.
2. **[[Population Dynamic]]**: "Open population" is one where the number of individuals changes over time due to births, deaths, and migration.

---

## THE THEORY OF DEMOGRAPHIC TRANSITION AS IT AFFECTS GLOBAL POPULATION

### According to Bonald Lee (2003)
Demography is currently in transition; the global demographic transition all began in the 19th century when Europeans were declining in mortality rate (Lee, 2003) and there were some rising societies in Asian and Latin American regions.

### According to Cohen (2008)
Cohen (2008) believed that by 2050 there will be 9 billion people on the planet, addition of over 50 million per year. But after the increase on population, the world will experience a global decline of population – slower growth, increasing decline, older people and more urban living.

---

## 5 STAGES OF DEMOGRAPHIC TRANSITION

- **[[Stage 1: High Stationary]]**: The first stage consists of high birth and death rates. At this stage, the population is stable or grows quite slowly because the number of births and deaths are almost equal.
- **[[Stage 2: Early Expansion]]**: In the second stage, there is a sharp decline in death rates, causing the population to grow rapidly.
- **[[Stage 3: Late Expansion]]**: The third stage sees the birth rate fall, which slows down population growth.
- **[[Stage 4: Low Stationary]]**: In the fourth stage, both the birth and death rates are low, resulting in a falling and then stable population.
- **[[Stage 5: Declining]]**: The fifth and final stage shows little population change, although it is somewhat ambiguous.

---

## TYPES OF POPULATION PYRAMIDS

1. **[[Expanding Pyramid]]**: With base (high birth rate and a lot of young people) narrow top (low life expectancies, very few old people). Typical of the least economically developed countries.
2. **[[Stationary Pyramid]]**: Narrower base (birth rate is decreasing) and wider top (life expectancy is increasing). Most of the population are adults. Typical of developing countries.
3. **[[Contracting Pyramid]]**: Narrow base (very low birth rate, few young people), wide top (very high life expectancy, a lot of old people). Typical of developed countries.

---

## DEMOGRAPHIC SUICIDE & MIGRATION

- **[[Demographic Suicide]]**: Imbalance weight of population of a developed + developing countries = demographic suicide (a situation where there is a continuous imbalance between birth and death). Example: Germany, Japan, Italy, Russia and South Korea.
- **[[Migration Solution]]**: Migration as solution to demographic suicide is being taken for consideration which results to Intermarriage.
- **[[Philippine Context]]**: In the Philippine context, overpopulation did not manifest. However, some experts in local or internal migration suggest that due to the promise of a good quality of living, Filipinos from rural areas move to cities thus causing overpopulation. Internal migration may cause overpopulation in some areas of the country.

---

## FACTORS AFFECTING THE DEMOGRAPHY OF THE WORLD

- **[[Erratic Mortality]]**: Refers to fluctuating or inconsistent death rates within a population.
- **[[Ancient Regime Crisis]]**: Are kinds of crisis made by man. Example: man-made famine that hit Ukraine-Russia, China and North Korea.

---

## FIVE GLOBAL DEMOGRAPHIC TRENDS

1. **[[Decline in child-to-elder ratio]]**: Fewer children are born compared to the growing elderly population, reversing historical ratios. Example: By 2050, Europe will have twice as many people over 65 as children under 15 (except in China/Russia, where aging is even faster).
2. **[[Rise of non-communicable diseases]]**: Aging populations face more chronic illnesses (e.g., diabetes, depression) instead of infectious diseases. Example: By 2030, depression will be the top cause of disability worldwide (WHO).
3. **[[Speed of aging in emerging economies]]**: Developing countries age faster than rich ones did, with less time to prepare. Example: Brazil will transition from "young" to "aged" society in ~20 years—a shift that took France 150 years.
4. **[[Rising old age dependency]]**: More retirees depend on fewer workers due to low birth rates and longer lives. Example: Japan’s workforce shrank by 13% since 2000, with 1.8 workers per retiree (vs. 3.5 in the U.S.).
5. **[[Difficulty exploiting demographic dividend]]**: Countries miss the economic boom from a large working-age population due to poor policies or rapid aging. Example: India’s young population could boost growth, but lack of jobs/education risks wasting this advantage.

---

## DEMOGRAPHIC POLICIES

1. **[[Pro-Natalist Policy]]**: Adopted by countries with low fertility, few births and an ageing population with the purpose of encouraging people to have more children. Governments give economic help, tax education, long parental leaves and numerous social benefits to the families with children.
2. **[[Anti-Natalist Policy]]**: Adopted by countries with over population, in order to slow population growth. Governments promote family planning services and contraceptives, give incentives to reduce the births or fine the families who have more children than the allowed number.`,
  },

  // 2. QUESTIONNAIRE REVIEWER (Global Demography - Exactly 30 MCQs & 10 Identifications)
  {
    id: 'quiz-demo-201',
    title: 'Global Demography Testpaper (30 MCQs & 10 Identifications)',
    docType: 'pdf',
    fileName: 'Global_Demography_Exam_Questionnaire.pdf',
    fileSize: '4.2 MB',
    uploadDate: 'Just now',
    reviewerType: 'questionnaire',
    questionnaireItems: [
      // --- PART I: MULTIPLE CHOICE QUESTIONS (30 MCQs) ---
      { type: 'header', id: 'h-dem-1', message: 'Terminologies in Demography' },
      {
        type: 'mcq',
        id: 'q-dem-1',
        question: 'What is defined as the statistical study of human populations, concerned with birth, deaths, income or the incidence of disease?',
        choices: [
          { choiceText: 'Demography', isCorrect: true },
          { choiceText: 'Global Civil Society', isCorrect: false },
          { choiceText: 'Social Mobility', isCorrect: false },
          { choiceText: 'Demographic Static', isCorrect: false }
        ],
        explanation: 'Demography is the statistical study of human populations.'
      },
      {
        type: 'mcq',
        id: 'q-dem-2',
        question: 'What term describes the growth or decline of the total population, birth, death and migration?',
        choices: [
          { choiceText: 'Demographic change', isCorrect: true },
          { choiceText: 'Demographic measurement', isCorrect: false },
          { choiceText: 'Population density', isCorrect: false },
          { choiceText: 'Population dynamic', isCorrect: false }
        ],
        explanation: 'Demographic change refers to total population growth/decline, births, deaths, and migration.'
      },
      {
        type: 'mcq',
        id: 'q-dem-3',
        question: 'What is defined as the study and measurement of population using measurement tools?',
        choices: [
          { choiceText: 'Demographic measurement', isCorrect: true },
          { choiceText: 'Demographic phenomenon', isCorrect: false },
          { choiceText: 'Population static', isCorrect: false },
          { choiceText: 'Vital registration', isCorrect: false }
        ],
        explanation: 'Demographic measurement is the study and measurement of population using tools.'
      },
      {
        type: 'mcq',
        id: 'q-dem-4',
        question: 'What term defines the number of people who live in a place per square km?',
        choices: [
          { choiceText: 'Population density', isCorrect: true },
          { choiceText: 'Population size', isCorrect: false },
          { choiceText: 'Population distribution', isCorrect: false },
          { choiceText: 'Population structure', isCorrect: false }
        ],
        explanation: 'Population density is the number of people per square km.'
      },
      {
        type: 'mcq',
        id: 'q-dem-5',
        question: 'What term refers to the number of person in a population?',
        choices: [
          { choiceText: 'Size', isCorrect: true },
          { choiceText: 'Structure', isCorrect: false },
          { choiceText: 'Distribution', isCorrect: false },
          { choiceText: 'Density', isCorrect: false }
        ],
        explanation: 'Size refers to the number of persons in a population.'
      },
      {
        type: 'mcq',
        id: 'q-dem-6',
        question: 'What term describes the arrangement of population in a space at a given time?',
        choices: [
          { choiceText: 'Distribution', isCorrect: true },
          { choiceText: 'Structure', isCorrect: false },
          { choiceText: 'Composition', isCorrect: false },
          { choiceText: 'Mobility', isCorrect: false }
        ],
        explanation: 'Distribution is the arrangement of population in space at a given time.'
      },
      {
        type: 'mcq',
        id: 'q-dem-7',
        question: 'What term refers to the distribution of population among its sex and age groupings?',
        choices: [
          { choiceText: 'Structure', isCorrect: true },
          { choiceText: 'Density', isCorrect: false },
          { choiceText: 'Size', isCorrect: false },
          { choiceText: 'Static', isCorrect: false }
        ],
        explanation: 'Structure is the distribution of population among sex and age groupings.'
      },
      {
        type: 'mcq',
        id: 'q-dem-8',
        question: 'What term defines the number of deaths in a place during a year?',
        choices: [
          { choiceText: 'Mortality rate', isCorrect: true },
          { choiceText: 'Life expectancy', isCorrect: false },
          { choiceText: 'Erratic mortality', isCorrect: false },
          { choiceText: 'Fertility rate', isCorrect: false }
        ],
        explanation: 'Mortality rate is the number of deaths in a place during a year.'
      },
      {
        type: 'mcq',
        id: 'q-dem-9',
        question: 'What term refers to the number of years a person is expected to live in a specific place?',
        choices: [
          { choiceText: 'Life expectancy', isCorrect: true },
          { choiceText: 'Mortality rate', isCorrect: false },
          { choiceText: 'Social mobility', isCorrect: false },
          { choiceText: 'Demographic dividend', isCorrect: false }
        ],
        explanation: 'Life expectancy is the number of years a person is expected to live in a place.'
      },

      { type: 'header', id: 'h-dem-2', message: 'Global Demography & Data Sources' },
      {
        type: 'mcq',
        id: 'q-dem-10',
        question: 'What does Global Demography study?',
        choices: [
          { choiceText: 'The trends and practices in world politics and issues/developments of global population', isCorrect: true },
          { choiceText: 'Strictly regional economic banking transactions', isCorrect: false },
          { choiceText: 'Local weather patterns and climate changes', isCorrect: false },
          { choiceText: 'Industrial manufacturing supply chains', isCorrect: false }
        ],
        explanation: 'Global Demography studies world politics trends and global population issues.'
      },
      {
        type: 'mcq',
        id: 'q-dem-11',
        question: 'Where do transnational non-governmental organizations and social movements operate offering an alternative to transnational corporations?',
        choices: [
          { choiceText: 'Global Civil Society', isCorrect: true },
          { choiceText: 'United Nations Security Council', isCorrect: false },
          { choiceText: 'World Bank Board', isCorrect: false },
          { choiceText: 'International Court of Justice', isCorrect: false }
        ],
        explanation: 'Global Civil Society is where transnational NGOs and social movements operate.'
      },
      {
        type: 'mcq',
        id: 'q-dem-12',
        question: 'What is the salient influence of global civil society in global demography?',
        choices: [
          { choiceText: 'Influence on institutional decision-making, affecting the populations at large', isCorrect: true },
          { choiceText: 'Direct taxation of international trade goods', isCorrect: false },
          { choiceText: 'Mandatory military recruitment of young adults', isCorrect: false },
          { choiceText: 'Setting interest rates for national commercial banks', isCorrect: false }
        ],
        explanation: 'Global civil society influences institutional decision-making affecting populations.'
      },
      {
        type: 'mcq',
        id: 'q-dem-13',
        question: 'Which of the following is listed as one of the 4 Sources of Data in demography?',
        choices: [
          { choiceText: 'Registration of Vital Events', isCorrect: true },
          { choiceText: 'Social Media Polling', isCorrect: false },
          { choiceText: 'Satellite Telemetry', isCorrect: false },
          { choiceText: 'Commercial Credit Reports', isCorrect: false }
        ],
        explanation: 'The 4 sources of data are Census, National Survey, Registration of Vital Events, and Demographic Studies.'
      },

      { type: 'header', id: 'h-dem-3', message: 'Demographic Processes & Measurement Aspects' },
      {
        type: 'mcq',
        id: 'q-dem-14',
        question: 'Which demographic process decreases the population through deaths, affecting life expectancy and population growth?',
        choices: [
          { choiceText: 'Mortality', isCorrect: true },
          { choiceText: 'Fertility', isCorrect: false },
          { choiceText: 'Migration', isCorrect: false },
          { choiceText: 'Marriage', isCorrect: false }
        ],
        explanation: 'Mortality decreases the population through deaths.'
      },
      {
        type: 'mcq',
        id: 'q-dem-15',
        question: 'Which demographic process increases the population through births, shaping age and gender structure?',
        choices: [
          { choiceText: 'Fertility', isCorrect: true },
          { choiceText: 'Mortality', isCorrect: false },
          { choiceText: 'Social Mobility', isCorrect: false },
          { choiceText: 'Migration', isCorrect: false }
        ],
        explanation: 'Fertility increases the population through births.'
      },
      {
        type: 'mcq',
        id: 'q-dem-16',
        question: 'Which demographic process alters population size and distribution by moving people in or out of a place?',
        choices: [
          { choiceText: 'Migration', isCorrect: true },
          { choiceText: 'Marriage', isCorrect: false },
          { choiceText: 'Fertility', isCorrect: false },
          { choiceText: 'Social Mobility', isCorrect: false }
        ],
        explanation: 'Migration alters population size and distribution by moving people.'
      },
      {
        type: 'mcq',
        id: 'q-dem-17',
        question: 'Which demographic process influences household formation, fertility rates, and social roles?',
        choices: [
          { choiceText: 'Marriage', isCorrect: true },
          { choiceText: 'Mortality', isCorrect: false },
          { choiceText: 'Erratic Mortality', isCorrect: false },
          { choiceText: 'Social Mobility', isCorrect: false }
        ],
        explanation: 'Marriage influences household formation, fertility rates, and social roles.'
      },
      {
        type: 'mcq',
        id: 'q-dem-18',
        question: 'What process reflects changes in social and economic status, indirectly shaping demographic behavior through education, occupation, and health?',
        choices: [
          { choiceText: 'Social Mobility', isCorrect: true },
          { choiceText: 'Demographic Change', isCorrect: false },
          { choiceText: 'Demographic Suicide', isCorrect: false },
          { choiceText: 'Population Dynamic', isCorrect: false }
        ],
        explanation: 'Social mobility reflects changes in social and economic status.'
      },
      {
        type: 'mcq',
        id: 'q-dem-19',
        question: 'How is "Population Static" defined under aspects of demographic measurement?',
        choices: [
          { choiceText: 'A group where the number of individuals remains constant over time due to factors like absence of births, deaths, or migration', isCorrect: true },
          { choiceText: 'An open population where numbers change over time due to migration', isCorrect: false },
          { choiceText: 'A nation experiencing a rapid shift in child-to-elder ratio', isCorrect: false },
          { choiceText: 'A population under an anti-natalist fine policy', isCorrect: false }
        ],
        explanation: 'Population static is a group where numbers remain constant over time.'
      },
      {
        type: 'mcq',
        id: 'q-dem-20',
        question: 'What defines a "Population Dynamic"?',
        choices: [
          { choiceText: 'An "open population" where the number of individuals changes over time due to births, deaths, and migration', isCorrect: true },
          { choiceText: 'A closed population where numbers remain strictly unvarying', isCorrect: false },
          { choiceText: 'A population with zero mortality and zero fertility', isCorrect: false },
          { choiceText: 'A nation adopting a pro-natalist tax incentive', isCorrect: false }
        ],
        explanation: 'Population dynamic is an open population where numbers change over time.'
      },

      { type: 'header', id: 'h-dem-4', message: 'Demographic Transition Theory & 5 Stages' },
      {
        type: 'mcq',
        id: 'q-dem-21',
        question: 'According to Bonald Lee (2003), when did the global demographic transition begin?',
        choices: [
          { choiceText: '19th century when Europeans were declining in mortality rate', isCorrect: true },
          { choiceText: '20th century during the industrial revolution in North America', isCorrect: false },
          { choiceText: '18th century in Asian agricultural societies', isCorrect: false },
          { choiceText: '21st century with global urbanization', isCorrect: false }
        ],
        explanation: 'Lee (2003) stated global demographic transition began in the 19th century in Europe.'
      },
      {
        type: 'mcq',
        id: 'q-dem-22',
        question: 'What did Cohen (2008) believe regarding global population by 2050?',
        choices: [
          { choiceText: 'There will be 9 billion people on the planet (+50M/yr), followed by a global population decline', isCorrect: true },
          { choiceText: 'Population will stabilize permanently at 15 billion people', isCorrect: false },
          { choiceText: 'Population will decline by half due to infectious diseases', isCorrect: false },
          { choiceText: 'There will be zero urban migration in developing nations', isCorrect: false }
        ],
        explanation: 'Cohen (2008) believed population will reach 9 billion by 2050 followed by global decline.'
      },
      {
        type: 'mcq',
        id: 'q-dem-23',
        question: 'What characterizes STAGE 1: HIGH STATIONARY in the 5 Stages of Demographic Transition?',
        choices: [
          { choiceText: 'High birth and death rates; population is stable or grows quite slowly because births and deaths are almost equal', isCorrect: true },
          { choiceText: 'Sharp decline in death rates causing population to grow rapidly', isCorrect: false },
          { choiceText: 'Birth rate falls slowing down population growth', isCorrect: false },
          { choiceText: 'Both birth and death rates are low resulting in falling population', isCorrect: false }
        ],
        explanation: 'Stage 1 High Stationary consists of high birth and death rates keeping population stable.'
      },
      {
        type: 'mcq',
        id: 'q-dem-24',
        question: 'What happens during STAGE 2: EARLY EXPANSION?',
        choices: [
          { choiceText: 'There is a sharp decline in death rates, causing the population to grow rapidly', isCorrect: true },
          { choiceText: 'Birth rates fall drastically while death rates rise', isCorrect: false },
          { choiceText: 'Both birth and death rates reach zero', isCorrect: false },
          { choiceText: 'Emigration exceeds immigration across all sectors', isCorrect: false }
        ],
        explanation: 'Stage 2 Early Expansion sees sharp death rate decline causing rapid growth.'
      },
      {
        type: 'mcq',
        id: 'q-dem-25',
        question: 'What characterizes STAGE 3: LATE EXPANSION?',
        choices: [
          { choiceText: 'The birth rate falls, which slows down population growth', isCorrect: true },
          { choiceText: 'Death rates double while birth rates remain high', isCorrect: false },
          { choiceText: 'The population contracts by 50% per decade', isCorrect: false },
          { choiceText: 'Both birth and death rates equal zero', isCorrect: false }
        ],
        explanation: 'Stage 3 Late Expansion sees falling birth rates slowing growth.'
      },
      {
        type: 'mcq',
        id: 'q-dem-26',
        question: 'What characterizes STAGE 4: LOW STATIONARY?',
        choices: [
          { choiceText: 'Both birth and death rates are low, resulting in a falling and then stable population', isCorrect: true },
          { choiceText: 'High birth rates and low death rates causing explosive growth', isCorrect: false },
          { choiceText: 'High death rates and zero birth rates', isCorrect: false },
          { choiceText: 'Ambiguous changes in total land mass', isCorrect: false }
        ],
        explanation: 'Stage 4 Low Stationary features low birth and death rates.'
      },
      {
        type: 'mcq',
        id: 'q-dem-27',
        question: 'What characterizes STAGE 5: DECLINING?',
        choices: [
          { choiceText: 'Shows little population change, although it is somewhat ambiguous', isCorrect: true },
          { choiceText: 'Rapid population explosion driven by high fertility', isCorrect: false },
          { choiceText: 'Sharp decline in elder dependency', isCorrect: false },
          { choiceText: 'Mandatory pro-natalist tax penalties', isCorrect: false }
        ],
        explanation: 'Stage 5 Declining shows little population change and is somewhat ambiguous.'
      },

      { type: 'header', id: 'h-dem-5', message: 'Pyramids, Trends & Policies' },
      {
        type: 'mcq',
        id: 'q-dem-28',
        question: 'What describes an "Expanding pyramid"?',
        choices: [
          { choiceText: 'Wide base (high birth rate, many young people) and narrow top (low life expectancies, few old people); typical of LEDCs', isCorrect: true },
          { choiceText: 'Narrower base and wider top with mostly adults; typical of developing countries', isCorrect: false },
          { choiceText: 'Narrow base, wide top with many old people; typical of developed countries', isCorrect: false },
          { choiceText: 'Linear vertical pyramid with equal age distribution', isCorrect: false }
        ],
        explanation: 'Expanding pyramids have a wide base and narrow top, typical of LEDCs.'
      },
      {
        type: 'mcq',
        id: 'q-dem-29',
        question: 'What is "Demographic Suicide"?',
        choices: [
          { choiceText: 'Imbalance weight of population of developed + developing countries = continuous imbalance between birth and death', isCorrect: true },
          { choiceText: 'A high birth rate coupled with high child mortality in LEDCs', isCorrect: false },
          { choiceText: 'Internal migration from rural areas to urban cities', isCorrect: false },
          { choiceText: 'Government promotion of contraceptives and family planning', isCorrect: false }
        ],
        explanation: 'Demographic suicide is a situation of continuous imbalance between birth and death.'
      },
      {
        type: 'mcq',
        id: 'q-dem-30',
        question: 'What is the purpose of a Pro-Natalist Policy vs an Anti-Natalist Policy?',
        choices: [
          { choiceText: 'Pro-Natalist encourages having more children (economic help, leaves); Anti-Natalist slows population growth (family planning, fines)', isCorrect: true },
          { choiceText: 'Pro-Natalist restricts birth rates; Anti-Natalist subsidizes large families', isCorrect: false },
          { choiceText: 'Both policies strictly mandate internal rural-to-urban migration', isCorrect: false },
          { choiceText: 'Both policies apply solely to elderly pension distributions', isCorrect: false }
        ],
        explanation: 'Pro-natalist encourages births; Anti-natalist slows population growth.'
      },

      // --- PART II: IDENTIFICATION QUESTIONS (10 Identifications) ---
      { type: 'header', id: 'h-dem-6', message: 'Demographic Term Identification' },
      {
        type: 'identification',
        id: 'qi-dem-1',
        question: 'What is the statistical study of human populations concerned with birth, deaths, income or the incidence of disease?',
        answers: ['Demography', 'demography'],
        hint: 'Statistical study of human populations'
      },
      {
        type: 'identification',
        id: 'qi-dem-2',
        question: 'What term refers to the number of people who live in a place per square km?',
        answers: ['Population Density', 'Population density', 'population density'],
        hint: 'People per sq km'
      },
      {
        type: 'identification',
        id: 'qi-dem-3',
        question: 'What term defines the number of years a person is expected to live in a specific place?',
        answers: ['Life Expectancy', 'Life expectancy', 'life expectancy'],
        hint: 'Expected lifespan years'
      },
      {
        type: 'identification',
        id: 'qi-dem-4',
        question: 'What aspect of demographic measurement is defined as an "open population" where numbers change over time due to births, deaths, and migration?',
        answers: ['Population Dynamic', 'Population dynamic', 'population dynamic'],
        hint: 'Open population'
      },
      {
        type: 'identification',
        id: 'qi-dem-5',
        question: 'What aspect of demographic measurement is a group where numbers remain constant over time due to absence of births, deaths, or migration?',
        answers: ['Population Static', 'Population static', 'population static'],
        hint: 'Constant closed group'
      },
      {
        type: 'identification',
        id: 'qi-dem-6',
        question: 'What situation describes a continuous imbalance between birth and death (examples include Germany, Japan, Italy, Russia, and South Korea)?',
        answers: ['Demographic Suicide', 'Demographic suicide', 'demographic suicide'],
        hint: 'Imbalance between birth and death'
      },
      {
        type: 'identification',
        id: 'qi-dem-7',
        question: 'What term refers to fluctuating or inconsistent death rates within a population?',
        answers: ['Erratic Mortality', 'Erratic mortality', 'erratic mortality'],
        hint: 'Fluctuating death rates'
      },
      {
        type: 'identification',
        id: 'qi-dem-8',
        question: 'What term describes man-made demographic crises such as man-made famines?',
        answers: ['Ancient Regime Crisis', 'Ancient regime crisis', 'ancient regime crisis'],
        hint: 'Man-made crisis'
      },
      {
        type: 'identification',
        id: 'qi-dem-9',
        question: 'What policy is adopted by countries with low fertility and ageing population to encourage people to have more children?',
        answers: ['Pro-Natalist Policy', 'Pro-Natalist', 'pro-natalist policy', 'Pro Natalist Policy'],
        hint: 'Encourages more children'
      },
      {
        type: 'identification',
        id: 'qi-dem-10',
        question: 'What policy is adopted by countries with overpopulation in order to slow population growth using family planning and contraceptives?',
        answers: ['Anti-Natalist Policy', 'Anti-Natalist', 'anti-natalist policy', 'Anti Natalist Policy'],
        hint: 'Slows population growth'
      }
    ]
  }
];
