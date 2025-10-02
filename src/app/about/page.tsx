'use client';

import Image from 'next/image';
import { useAboutHero, useAboutStory, useAboutValues, useTeamMembers, useAboutContent } from '../../../hooks/useAboutData';
import { getAboutIcon } from '../../../utils/aboutIcons';

export default function AboutPage() {
  const { hero, loading: heroLoading } = useAboutHero();
  const { story, loading: storyLoading } = useAboutStory();
  const { values, loading: valuesLoading } = useAboutValues();
  const { team, loading: teamLoading } = useTeamMembers();
  const { content, loading: contentLoading } = useAboutContent();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - 50vh height with full width */}
      <section className="relative h-[50vh] bg-gradient-to-br from-royal-red via-red-800 to-red-900 overflow-hidden">
        {/* Background Image */}
        {hero?.image_url && (
          <div className="absolute inset-0">
            <Image
              src={hero.image_url}
              alt={hero.alt_text}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-royal-red/80"></div>
          </div>
        )}
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-royal-red/90 via-red-800/85 to-red-900/90">
          <div className="absolute inset-0 opacity-10 bg-bengali-pattern"></div>
        </div>

        <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {heroLoading ? (
              <div className="animate-pulse">
                <div className="h-16 bg-white/20 rounded mb-6"></div>
                <div className="h-6 bg-white/20 rounded max-w-2xl mx-auto"></div>
              </div>
            ) : hero ? (
              <>
                <h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {hero.title}
                </h1>
                <p 
                  className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {hero.subtitle}
                </p>
              </>
            ) : (
              <p className="text-xl text-red-100">Loading hero content...</p>
            )}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000"></div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 left-6 opacity-25 z-0">
          <Image
            src="/img/12873194_7666-removebg-preview.png"
            alt="Decoration"
            width={320}
            height={320}
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-10 right-6 opacity-25 z-0">
          <Image
            src="/img/62569719_9509225.png"
            alt="Decoration"
            width={290}
            height={290}
            className="object-contain"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {storyLoading ? (
            <div className="animate-pulse">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="h-10 bg-gray-200 rounded mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="h-80 bg-gray-200 rounded-2xl"></div>
              </div>
            </div>
          ) : story && story.title ? (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-6"
                  style={{ 
                    fontFamily: 'Playfair Display, serif',
                    color: '#B22222'
                  }}
                >
                  {story.title}
                </h2>
                <div 
                  className="text-lg mb-8 leading-relaxed"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: '#333333'
                  }}
                  dangerouslySetInnerHTML={{ __html: story.content }}
                />
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 rounded-xl border" style={{ backgroundColor: '#B22222', color: 'white', borderColor: '#B22222' }}>
                    <div className="text-3xl font-bold">{story.happy_couples}+</div>
                    <div className="text-sm font-medium opacity-90">Happy Couples</div>
                  </div>
                  <div className="text-center p-4 rounded-xl border" style={{ backgroundColor: '#B22222', color: 'white', borderColor: '#B22222' }}>
                    <div className="text-3xl font-bold">{story.years_experience}</div>
                    <div className="text-sm font-medium opacity-90">Years Experience</div>
                  </div>
                  <div className="text-center p-4 rounded-xl border" style={{ backgroundColor: '#B22222', color: 'white', borderColor: '#B22222' }}>
                    <div className="text-3xl font-bold">{story.photos_captured}</div>
                    <div className="text-sm font-medium opacity-90">Photos Captured</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                  {story.image_url ? (
                    <Image
                      src={story.image_url}
                      alt={story.alt_text}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-royal-red/20 to-red-100 flex items-center justify-center">
                      <p className="text-gray-500">Story image placeholder</p>
                    </div>
                  )}
                </div>
                {/* Decorative border */}
                <div className="absolute -inset-4 bg-gradient-to-br from-royal-red/20 to-transparent rounded-3xl -z-10"></div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20" style={{ color: '#666666' }}>
              <p>Loading story content...</p>
            </div>
          )}
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 left-10 opacity-20 z-0 rotate-12">
          <Image
            src="/img/12873194_7666-removebg-preview.png"
            alt="Decoration"
            width={275}
            height={275}
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 z-0 -rotate-12">
          <Image
            src="/img/62569719_9509225.png"
            alt="Decoration"
            width={305}
            height={305}
            className="object-contain"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#B22222'
              }}
            >
              Our Mission & Values
            </h2>
          </div>

          {valuesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : values.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => {
                const IconComponent = getAboutIcon(value.icon_type);
                return (
                  <div key={value.id} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border border-gray-200">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#B22222', color: 'white' }}>
                      <IconComponent className="w-8 h-8" style={{ color: 'white' }} />
                    </div>
                    <h3 
                      className="text-xl font-bold mb-3 transition-colors duration-300"
                      style={{ 
                        fontFamily: 'Playfair Display, serif',
                        color: '#B22222'
                      }}
                    >
                      {value.title}
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        color: '#333333'
                      }}
                    >
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10" style={{ color: '#666666' }}>
              <p>Loading values...</p>
            </div>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-16 left-8 opacity-20 z-0">
          <Image
            src="/img/12873194_7666-removebg-preview.png"
            alt="Decoration"
            width={285}
            height={285}
            className="object-contain rotate-45"
          />
        </div>
        <div className="absolute bottom-16 right-8 opacity-20 z-0">
          <Image
            src="/img/62569719_9509225.png"
            alt="Decoration"
            width={265}
            height={265}
            className="object-contain -rotate-45"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#B22222'
              }}
            >
              Meet Our Team
            </h2>
          </div>

          {teamLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse text-center">
                  <div className="aspect-square bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-2/3 mx-auto"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : team.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.id} className="text-center group">
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                    {member.image_url ? (
                      <Image
                        src={member.image_url}
                        alt={member.alt_text}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#B22222', color: 'white' }}>
                        <p>Photo coming soon</p>
                      </div>
                    )}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-2 group-hover:transition-colors duration-300"
                    style={{ 
                      fontFamily: 'Playfair Display, serif',
                      color: '#B22222'
                    }}
                  >
                    {member.name}
                  </h3>
                  <p className="font-semibold mb-3" style={{ color: '#B22222' }}>{member.position}</p>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#333333'
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10" style={{ color: '#666666' }}>
              <p>Loading team information...</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}