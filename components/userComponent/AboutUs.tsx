import React from 'react'

const AboutUs = () => {
  return (
    <>
    <div className='flex flex-col  p-10 '>
        <div className=' flex  items-center justify-center w-full m-4'>
            <div className='flex flex-row underline underline-offset-8 font-bold text-2xl mb-14'>

            About us
            </div>
            
            </div>
        <div className='font-bold underline mb-4'>SIGN LANGUAGE</div>
        <p className='text-justify'>
        Sign Language is a visual means of communicating using gestures,
facial expression, and body language. Sign Language is used mainly by
people who are Deaf or have hearing impairments.
        </p>

        <div className='font-bold underline mt-4 mb-4' >BRITISH SIGN LANGUAGE {' (BSL)'}</div>
        <p className='text-justify'>
        Within Britain the most common form of Sign Language is called
British Sign Language {'(BSL)'}. BSL has its own grammatical structure
and syntax, as a language it is not dependant nor is it strongly related
to spoken English. BSL is the preferred language of around 145,000
people within the UK {'(2011)'}.
        </p>
        <div className='font-bold underline mt-4 mb-4' >A RECOGNISED LANGUAGE</div>
        <p className='text-justify'>
        After a big campaign BSL was finally recognised by the UK government as
an official minority language in 2003. This has led to increased funding for
the needs of the communication of people who are Deaf, and an
increased awareness of the language which now has a similar status to
that of other minority national languages such as Gaelic and Welsh.
        </p>
        <div className='font-bold underline mt-4 mb-4' >SIGN SUPPORTED ENGLISH {'(SSE)'}</div>
        <p className='text-justify'>
        Another form of signing used in Britain is known as Sign Supported
English {'(SSE)'}. SSE is not its own language. SSE uses the same signs as BSL
but they are used in the same order as spoken English. SSE is used to
support spoken English, especially within schools where children withhearing impairments are learning English grammar alongside their
signing, or by people who mix mainly with hearing people.
<a href='https://www.british-sign.co.uk/what-is-british-sign-language/' className='ml-2 font-semibold text-sky-500' target='_blank'>
https://www.british-sign.co.uk/what-is-british-sign-language/  
</a>
        </p>
    </div>
    </>
  )
}

export default AboutUs
