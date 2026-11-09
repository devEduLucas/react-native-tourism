# Diário de Viagem

Aplicativo mobile desenvolvido em React Native com TypeScript (Expo) para registrar momentos de viagens utilizando recursos nativos do dispositivo: câmera, GPS e acelerômetro.

Projeto da unidade curricular Programação para Dispositivos Móveis.

## Funcionalidades

- **Tela principal:** nome do aplicativo, botão para capturar fotografia, botão para obter a localização atual e leitura do acelerômetro em tempo real.
- **Câmera:** captura de fotografia com a câmera do dispositivo, exibição da imagem capturada e salvamento automático na galeria.
- **GPS:** solicitação de permissão de localização, obtenção de latitude e longitude e exibição das coordenadas na tela.
- **Acelerômetro:** leitura dos eixos X, Y e Z com atualização contínua na interface.

## Tecnologias

- React Native
- TypeScript
- Expo SDK 58
- React Navigation (native stack)
- expo-camera
- expo-location
- expo-sensors
- expo-media-library
- @react-native-vector-icons/material-icons

## Estrutura do projeto

```
App.tsx
app.json
src/
  components/
    ActionButton.tsx
    InfoCard.tsx
    ValueRow.tsx
  pages/
    Home.tsx
    Camera.tsx
  types/
    navigation.ts
```

| Arquivo | Responsabilidade |
| --- | --- |
| `App.tsx` | Configura a navegação em pilha entre as telas Home e Câmera. |
| `pages/Home.tsx` | Tela principal: botões de ação, localização e acelerômetro. |
| `pages/Camera.tsx` | Permissões, captura, visualização e salvamento da fotografia. |
| `components/ActionButton.tsx` | Botão reutilizável com ícone e indicador de carregamento. |
| `components/InfoCard.tsx` | Cartão com título para agrupar informações. |
| `components/ValueRow.tsx` | Linha com rótulo e valor. |
| `types/navigation.ts` | Tipagem das rotas da navegação. |

## Permissões

| Recurso | Quando é solicitada |
| --- | --- |
| Câmera | Ao abrir a tela de câmera. |
| Localização | Ao tocar em "Obter localização". |
| Galeria | Ao capturar uma fotografia, para salvá-la. |

Se alguma permissão for negada, o aplicativo exibe uma mensagem na tela e continua funcionando.

## Como executar

Pré-requisitos: Node.js, npm e o aplicativo Expo Go instalado no celular.

```bash
npx create-expo-app@latest react-native-tourism --template blank-typescript
cd react-native-tourism
npx expo install react-native-safe-area-context react-native-screens expo-camera expo-location expo-sensors expo-media-library @react-native-vector-icons/material-icons
npm install @react-navigation/native @react-navigation/native-stack
```

Copie `App.tsx`, `app.json` e a pasta `src/` deste repositório para o projeto criado e execute:

```bash
npx expo start
```

Leia o QR code com o Expo Go (Android) ou com a câmera (iOS).

## Observações por plataforma

- **Android e iOS:** todos os recursos funcionam no dispositivo físico.
- **Web:** o acelerômetro usa a API `devicemotion` do navegador, disponível apenas em dispositivos com sensor e em contexto seguro (HTTPS ou localhost). Em computadores os valores permanecem em 0. Salvar na galeria não é suportado.
