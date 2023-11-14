import { HTMLAttributes } from 'react';
import { Howl } from 'howler';
import coin from "./../assets/sounds/coin.mp3"
import correct from "./../assets/sounds/correct.mp3"


interface SoundEffectButtonProps extends HTMLAttributes<HTMLDivElement>{
  soundFile?: string;
}

// 코인 사운드
export const SoundEffectButton: React.FC<SoundEffectButtonProps> = ({ children, onClick, soundFile = coin, ...props }) => {
  const sound = new Howl({
    src: [soundFile]
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    sound.play();

    if(onClick) onClick(e);
  };

  return (
    <div onClick={handleClick} {...props}>
      {children}
    </div>
  );
}


// 확인 사운드
export const SoundEffectButton2: React.FC<SoundEffectButtonProps> = ({ children, onClick, soundFile = correct, ...props }) => {
  const sound = new Howl({
    src: [soundFile]
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    sound.play();

    if(onClick) onClick(e);
  };

  return (
    <div onClick={handleClick} {...props}>
      {children}
    </div>
  );
}

