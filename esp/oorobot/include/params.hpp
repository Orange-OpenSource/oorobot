//----------------------------------------------
//
//      params.hpp
//
//----------------------------------------------

#ifndef __PARAMS__
#define __PARAMS__

    struct Params {
        int stepCm;
        int turnSteps;
        int lineSteps;
        char btName[16];
    };

    extern Params params;

    void saveParams();
    void loadParams();

#endif