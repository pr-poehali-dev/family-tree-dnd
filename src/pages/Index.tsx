import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Character {
  name: string;
  age?: number;
  profession: string;
  class?: string;
  description?: string;
  generation: "grandparents" | "parents" | "children";
  family: string;
  spouse?: string;
  parents?: string[];
  children?: string[];
}

const getClassIcon = (profession: string) => {
  if (profession.includes("Паладин")) return "Shield";
  if (profession.includes("Воин")) return "Sword";
  if (profession.includes("Лекарь") || profession.includes("лекаря"))
    return "Heart";
  if (profession.includes("Кузнец")) return "Hammer";
  if (profession.includes("Охотник") || profession.includes("охотник"))
    return "Target";
  if (profession.includes("Ткачиха")) return "Scissors";
  if (profession.includes("Друг зверей")) return "Dog";
  if (profession.includes("Наблюдательница")) return "Eye";
  if (profession.includes("Следопыт")) return "Compass";
  if (profession.includes("Ремесленник")) return "Wrench";
  if (profession.includes("Основатель")) return "Crown";
  if (profession.includes("Хранительница")) return "Home";
  if (profession.includes("Старейшина")) return "Users";
  if (profession.includes("Страж")) return "ShieldCheck";
  return "User";
};

const familyData: Character[] = [
  // Дедушки и бабушки
  {
    name: "Мьёр",
    profession: "Основатель рода",
    generation: "grandparents",
    family: "Рагнар-Хельвия",
    spouse: "Сильфа",
  },
  {
    name: "Сильфа",
    profession: "Хранительница очага",
    generation: "grandparents",
    family: "Рагнар-Хельвия",
    spouse: "Мьёр",
  },
  {
    name: "Эйрикр",
    profession: "Старейшина",
    generation: "grandparents",
    family: "Рагнар-Хельвия",
    spouse: "Гудрун",
  },
  {
    name: "Гудрун",
    profession: "Лекарь",
    generation: "grandparents",
    family: "Рагнар-Хельвия",
    spouse: "Эйрикр",
  },
  {
    name: "Кваль",
    profession: "Ремесленник",
    generation: "grandparents",
    family: "Бьёрн-Лифа",
    spouse: "Зинтри",
  },
  {
    name: "Зинтри",
    profession: "Ткачиха",
    generation: "grandparents",
    family: "Бьёрн-Лифа",
    spouse: "Кваль",
  },

  // Родители
  {
    name: "Рагнар",
    profession: "Кузнец",
    generation: "parents",
    family: "Рагнар-Хельвия",
    spouse: "Хельвия",
    parents: ["Мьёр", "Сильфа"],
  },
  {
    name: "Хельвия",
    profession: "Лекарь",
    generation: "parents",
    family: "Рагнар-Хельвия",
    spouse: "Рагнар",
    parents: ["Эйрикр", "Гудрун"],
  },
  {
    name: "Бьёрн",
    profession: "Бывший страж",
    generation: "parents",
    family: "Бьёрн-Лифа",
    spouse: "Лифа",
    parents: ["Мьёр", "Сильфа"],
  },
  {
    name: "Лифа",
    profession: "Ткачиха",
    generation: "parents",
    family: "Бьёрн-Лифа",
    spouse: "Бьёрн",
    parents: ["Кваль", "Зинтри"],
  },

  // Дети
  {
    name: "Сиварг",
    age: 20,
    profession: "Паладин Пути Славы",
    generation: "children",
    family: "Рагнар-Хельвия",
    parents: ["Рагнар", "Хельвия"],
  },
  {
    name: "Йоран",
    age: 17,
    profession: "Ученик лекаря",
    generation: "children",
    family: "Рагнар-Хельвия",
    parents: ["Рагнар", "Хельвия"],
  },
  {
    name: "Сигрид",
    age: 15,
    profession: "Мечтающая охотница",
    generation: "children",
    family: "Рагнар-Хельвия",
    parents: ["Рагнар", "Хельвия"],
  },
  {
    name: "Келль",
    age: 13,
    profession: "Друг зверей",
    generation: "children",
    family: "Рагнар-Хельвия",
    parents: ["Рагнар", "Хельвия"],
  },
  {
    name: "Альва",
    age: 10,
    profession: "Наблюдательница",
    generation: "children",
    family: "Рагнар-Хельвия",
    parents: ["Рагнар", "Хельвия"],
  },
  {
    name: "Фенрир",
    age: 21,
    profession: "Монах (Воин-охотник)",
    generation: "children",
    family: "Бьёрн-Лифа",
    parents: ["Бьёрн", "Лифа"],
  },
  {
    name: "Фалкас",
    age: 19,
    profession: "Воин",
    generation: "children",
    family: "Бьёрн-Лифа",
    parents: ["Бьёрн", "Лифа"],
  },
  {
    name: "Фавн",
    age: 18,
    profession: "Следопыт",
    generation: "children",
    family: "Бьёрн-Лифа",
    parents: ["Бьёрн", "Лифа"],
  },
  {
    name: "Торвальд",
    age: 16,
    profession: "Ученик",
    generation: "children",
    family: "Бьёрн-Лифа",
    parents: ["Бьёрн", "Лифа"],
  },
  {
    name: "Эрик",
    age: 14,
    profession: "Юный воин",
    generation: "children",
    family: "Бьёрн-Лифа",
    parents: ["Бьёрн", "Лифа"],
  },
];

const Index = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const [masterNotes, setMasterNotes] = useState<{ [key: string]: string }>({});

  // Загрузка заметок из localStorage при загрузке компонента
  useEffect(() => {
    const savedNotes = localStorage.getItem("dnd-family-notes");
    if (savedNotes) {
      try {
        setMasterNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error("Error loading notes:", error);
      }
    }
  }, []);

  // Сохранение заметок в localStorage при изменении
  const updateNotes = (characterName: string, notes: string) => {
    const newNotes = { ...masterNotes, [characterName]: notes };
    setMasterNotes(newNotes);
    localStorage.setItem("dnd-family-notes", JSON.stringify(newNotes));
  };

  const getCharactersByGeneration = (generation: string) => {
    return familyData.filter((char) => char.generation === generation);
  };

  const getCharactersByFamily = (generation: string, family: string) => {
    return familyData.filter(
      (char) => char.generation === generation && char.family === family,
    );
  };

  const CharacterCard = ({ character }: { character: Character }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-800 hover:border-amber-600 hover:scale-105 hover:rotate-1 animate-fade-in group">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-900 font-bold text-lg flex items-center gap-2">
              <Icon
                name={getClassIcon(character.profession)}
                size={20}
                className="text-amber-700 group-hover:text-amber-600 transition-colors"
              />
              {character.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="bg-amber-100 text-amber-800 border-amber-600 group-hover:bg-amber-200 transition-colors"
              >
                {character.profession}
              </Badge>
              {character.age && (
                <p className="text-sm text-amber-700 flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  {character.age} лет
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-800 animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-amber-900 flex items-center gap-2">
            <Icon
              name={getClassIcon(character.profession)}
              size={24}
              className="text-amber-700"
            />
            {character.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-1">
                <Icon name="Briefcase" size={16} />
                Профессия
              </h4>
              <Badge className="bg-amber-700 text-amber-100">
                {character.profession}
              </Badge>
            </div>
            {character.age && (
              <div>
                <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-1">
                  <Icon name="Calendar" size={16} />
                  Возраст
                </h4>
                <p className="text-amber-700">{character.age} лет</p>
              </div>
            )}
          </div>

          {character.spouse && (
            <div>
              <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-1">
                <Icon name="Heart" size={16} />
                Супруг(а)
              </h4>
              <p className="text-amber-700">{character.spouse}</p>
            </div>
          )}

          {character.parents && (
            <div>
              <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-1">
                <Icon name="Users" size={16} />
                Родители
              </h4>
              <p className="text-amber-700">{character.parents.join(", ")}</p>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-1">
              <Icon name="ScrollText" size={16} />
              Заметки мастера
            </h4>
            <textarea
              className="w-full p-3 border border-amber-600 rounded-lg bg-amber-50 text-amber-900 placeholder-amber-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
              placeholder="Добавить заметки о персонаже..."
              rows={3}
              value={masterNotes[character.name] || ""}
              onChange={(e) => updateNotes(character.name, e.target.value)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const ConnectionLine = ({ from, to }: { from: string; to: string }) => (
    <div
      className="absolute h-0.5 bg-amber-600 opacity-60"
      style={{
        width: "100px",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-900 to-stone-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative">
            <h1 className="text-6xl font-bold text-amber-100 mb-4 font-serif rune-text animate-pulse">
              ᚱᚢᚾᛁᚲ ᚠᚨᛗᛁᛚᚤ ᛏᚱᛖᛖ
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-20 blur-xl animate-pulse"></div>
          </div>
          <h2 className="text-4xl text-amber-200 mb-6 animate-fade-in font-runic">
            Семейное Древо ДНД
          </h2>
          <div className="flex justify-center gap-4 mb-8">
            <Button className="bg-amber-700 hover:bg-amber-600 text-amber-100 border border-amber-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт древа
            </Button>
            <Button
              variant="outline"
              className="border-amber-600 text-amber-100 hover:bg-amber-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Icon name="ScrollText" size={16} className="mr-2" />
              Заметки мастера
            </Button>
          </div>
        </div>

        {/* Дедушки и бабушки */}
        <div className="mb-16 animate-fade-in">
          <h3 className="text-3xl font-bold text-amber-200 mb-8 text-center flex items-center justify-center gap-2 font-runic">
            <Icon
              name="Crown"
              size={28}
              className="text-amber-400 animate-pulse"
            />
            Старейшины Рода
            <Icon
              name="Crown"
              size={28}
              className="text-amber-400 animate-pulse"
            />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Семья Рагнар-Хельвия */}
            <div className="text-center">
              <h4 className="text-xl text-amber-300 mb-6 font-semibold">
                Род Рагнара
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {getCharactersByFamily("grandparents", "Рагнар-Хельвия").map(
                  (char) => (
                    <CharacterCard key={char.name} character={char} />
                  ),
                )}
              </div>
            </div>

            {/* Семья Бьёрн-Лифа */}
            <div className="text-center">
              <h4 className="text-xl text-amber-300 mb-6 font-semibold">
                Род Бьёрна
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {getCharactersByFamily("grandparents", "Бьёрн-Лифа").map(
                  (char) => (
                    <CharacterCard key={char.name} character={char} />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Линия соединения */}
        <div className="flex justify-center mb-12">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-60 animate-pulse"></div>
        </div>

        {/* Родители */}
        <div className="mb-16 animate-fade-in">
          <h3 className="text-3xl font-bold text-amber-200 mb-8 text-center flex items-center justify-center gap-2 font-runic">
            <Icon
              name="Users"
              size={28}
              className="text-amber-400 animate-pulse"
            />
            Родители
            <Icon
              name="Users"
              size={28}
              className="text-amber-400 animate-pulse"
            />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Семья Рагнар-Хельвия */}
            <div className="text-center">
              <h4 className="text-xl text-amber-300 mb-6 font-semibold">
                Рагнар и Хельвия
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {getCharactersByFamily("parents", "Рагнар-Хельвия").map(
                  (char) => (
                    <CharacterCard key={char.name} character={char} />
                  ),
                )}
              </div>
            </div>

            {/* Семья Бьёрн-Лифа */}
            <div className="text-center">
              <h4 className="text-xl text-amber-300 mb-6 font-semibold">
                Бьёрн и Лифа
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {getCharactersByFamily("parents", "Бьёрн-Лифа").map((char) => (
                  <CharacterCard key={char.name} character={char} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Линия соединения */}
        <div className="flex justify-center mb-12">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-60 animate-pulse"></div>
        </div>

        {/* Дети */}
        <div className="mb-16 animate-fade-in">
          <h3 className="text-3xl font-bold text-amber-200 mb-8 text-center flex items-center justify-center gap-2 font-runic">
            <Icon
              name="Sword"
              size={28}
              className="text-amber-400 animate-pulse"
            />
            Новое Поколение
            <Icon
              name="Sword"
              size={28}
              className="text-amber-400 animate-pulse"
            />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Дети Рагнар-Хельвия */}
            <div className="text-center">
              <h4 className="text-xl text-amber-300 mb-6 font-semibold">
                Дети Рагнара и Хельвии
              </h4>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {getCharactersByFamily("children", "Рагнар-Хельвия").map(
                  (char) => (
                    <CharacterCard key={char.name} character={char} />
                  ),
                )}
              </div>
            </div>

            {/* Дети Бьёрн-Лифа */}
            <div className="text-center">
              <h4 className="text-xl text-amber-300 mb-6 font-semibold">
                Дети Бьёрна и Лифы
              </h4>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {getCharactersByFamily("children", "Бьёрн-Лифа").map((char) => (
                  <CharacterCard key={char.name} character={char} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Футер */}
        <div className="text-center mt-16 pt-8 border-t border-amber-600 opacity-60 animate-fade-in">
          <p className="text-amber-300 font-serif rune-text text-lg">
            ᚦᛁᛋ ᛁᛋ ᚦᛖ ᛚᛖᚷᚨᚲᚤ ᛟᚠ ᛟᚢᚱ ᚨᚾᚲᛖᛋᛏᛟᚱᛋ
          </p>
          <p className="text-amber-400 mt-2 text-lg font-runic">
            Это наследие наших предков
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
