import React from 'react'
import { assets } from '../assets/assets'

const Appdownload = () => {
    return (
        
            <div className="max-w-6xl mx-auto my-10 px-4">
              <div className="flex flex-col-reverse lg:flex-row items-center justify-between bg-gray-100 rounded-xl p-8 shadow-md">
                
                {/* Left Section: Text + Buttons */}
                <div className="text-center lg:text-left max-w-xl">
                  <h1 className="text-2xl md:text-3xl font-semibold mb-6">
                    Download Mobile App for Better Experience
                  </h1>
                  <div className="flex justify-center lg:justify-start gap-4">
                    <a href="#">
                      <img
                        src={assets.app_store}
                        alt="App Store"
                        className="h-12 md:h-14"
                      />
                    </a>
                    <a href="#">
                      <img
                        src={assets.play_store}
                        alt="Play Store"
                        className="h-12 md:h-14"
                      />
                    </a>
                  </div>
                </div>
          
                {/* Right Section: App Image */}
                <div className="mb-6 lg:mb-0">
                  <img
                    src={assets.app_main_img}
                    alt="App Illustration"
                    className="max-w-xs md:max-w-sm lg:max-w-md"
                  />
                </div>
              </div>
            </div>
          );
          
        }

export default Appdownload;