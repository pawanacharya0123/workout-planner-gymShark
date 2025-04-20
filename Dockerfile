FROM node:23.6.1

COPY . /work-planner
RUN rm -rf /work-planner/node-modules

WORKDIR /work-planner
RUN npm ci

CMD npm run dev